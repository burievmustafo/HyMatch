import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, TextInput, Alert, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useUser } from '@/contexts/UserContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { User } from '@/types/User';
import { X, Camera, Upload } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';

export default function EditProfileModal() {
  const router = useRouter();
  const { user, setUser } = useUser();
  const { t } = useLanguage();
  
  const [formData, setFormData] = useState<Partial<User>>({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    age: user?.age || 20,
    gender: user?.gender || 'male',
    nationality: user?.nationality || '',
    email: user?.email || '',
    phone: user?.phone || '',
    japaneseLevel: user?.japaneseLevel || 'N5',
    preferredDays: user?.preferredDays || [],
    preferredJobTypes: user?.preferredJobTypes || [],
    profilePicture: user?.profilePicture || '',
  });

  const handleSave = () => {
    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'phone'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    const newUser: User = {
      id: user?.id || Date.now().toString(),
      ...formData as User,
      isProfileComplete: true,
    };

    setUser(newUser);
    router.back();
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setFormData(prev => ({ ...prev, profilePicture: result.assets[0].uri }));
    }
  };

  const genders = [
    { key: 'male', label: t('profile.male') },
    { key: 'female', label: t('profile.female') },
    { key: 'other', label: t('profile.other') },
  ];
  const japaneseLevels = ['N1', 'N2', 'N3', 'N4', 'N5'];
  const workDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const jobTypes = ['cooking', 'delivery', 'warehouse', 'cleaning', 'retail', 'restaurant', 'office', 'construction'];

  const toggleDay = (day: string) => {
    setFormData(prev => ({
      ...prev,
      preferredDays: prev.preferredDays?.includes(day)
        ? prev.preferredDays.filter(d => d !== day)
        : [...(prev.preferredDays || []), day]
    }));
  };

  const toggleJobType = (type: string) => {
    setFormData(prev => ({
      ...prev,
      preferredJobTypes: prev.preferredJobTypes?.includes(type)
        ? prev.preferredJobTypes.filter(t => t !== type)
        : [...(prev.preferredJobTypes || []), type]
    }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#10B981', '#059669']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.title}>{t('profile.edit')}</Text>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => router.back()}
          >
            <X size={24} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('profile.basicInfo')}</Text>
          
          <View style={styles.photoSection}>
            <TouchableOpacity style={styles.photoContainer} onPress={pickImage}>
              {formData.profilePicture ? (
                <Image source={{ uri: formData.profilePicture }} style={styles.profileImage} />
              ) : (
                <View style={styles.photoPlaceholder}>
                  <Camera size={32} color="#10B981" />
                </View>
              )}
              <View style={styles.uploadBadge}>
                <Upload size={16} color="#ffffff" />
              </View>
            </TouchableOpacity>
            <Text style={styles.photoText}>{t('profile.addPhoto')}</Text>
          </View>

          <View style={styles.row}>
            <View style={styles.halfInput}>
              <Text style={styles.label}>{t('profile.firstName')} *</Text>
              <TextInput
                style={styles.input}
                value={formData.firstName}
                onChangeText={(text) => setFormData(prev => ({ ...prev, firstName: text }))}
                placeholder={t('profile.firstName')}
              />
            </View>
            <View style={styles.halfInput}>
              <Text style={styles.label}>{t('profile.lastName')} *</Text>
              <TextInput
                style={styles.input}
                value={formData.lastName}
                onChangeText={(text) => setFormData(prev => ({ ...prev, lastName: text }))}
                placeholder={t('profile.lastName')}
              />
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.halfInput}>
              <Text style={styles.label}>{t('profile.age')}</Text>
              <TextInput
                style={styles.input}
                value={formData.age?.toString()}
                onChangeText={(text) => setFormData(prev => ({ ...prev, age: parseInt(text) || 20 }))}
                placeholder="Age"
                keyboardType="numeric"
              />
            </View>
            <View style={styles.halfInput}>
              <Text style={styles.label}>{t('profile.gender')}</Text>
              <View style={styles.segmentedControl}>
                {genders.map((gender) => (
                  <TouchableOpacity
                    key={gender.key}
                    style={[
                      styles.segment,
                      formData.gender === gender.key && styles.segmentActive
                    ]}
                    onPress={() => setFormData(prev => ({ ...prev, gender: gender.key as any }))}
                  >
                    <Text style={[
                      styles.segmentText,
                      formData.gender === gender.key && styles.segmentTextActive
                    ]}>
                      {gender.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          <Text style={styles.label}>{t('profile.nationality')}</Text>
          <TextInput
            style={styles.input}
            value={formData.nationality}
            onChangeText={(text) => setFormData(prev => ({ ...prev, nationality: text }))}
            placeholder={t('profile.nationality')}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('profile.contactInfo')}</Text>
          
          <Text style={styles.label}>{t('profile.email')} *</Text>
          <TextInput
            style={styles.input}
            value={formData.email}
            onChangeText={(text) => setFormData(prev => ({ ...prev, email: text }))}
            placeholder={t('profile.email')}
            keyboardType="email-address"
          />

          <Text style={styles.label}>{t('profile.phone')} *</Text>
          <TextInput
            style={styles.input}
            value={formData.phone}
            onChangeText={(text) => setFormData(prev => ({ ...prev, phone: text }))}
            placeholder={t('profile.phone')}
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('profile.workPreferences')}</Text>
          
          <Text style={styles.label}>{t('profile.japaneseLevel')}</Text>
          <View style={styles.segmentedControl}>
            {japaneseLevels.map((level) => (
              <TouchableOpacity
                key={level}
                style={[
                  styles.segment,
                  formData.japaneseLevel === level && styles.segmentActive
                ]}
                onPress={() => setFormData(prev => ({ ...prev, japaneseLevel: level as any }))}
              >
                <Text style={[
                  styles.segmentText,
                  formData.japaneseLevel === level && styles.segmentTextActive
                ]}>
                  {level}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>{t('profile.preferredDays')}</Text>
          <View style={styles.optionsGrid}>
            {workDays.map((day) => (
              <TouchableOpacity
                key={day}
                style={[
                  styles.gridOption,
                  formData.preferredDays?.includes(day) && styles.gridOptionSelected
                ]}
                onPress={() => toggleDay(day)}
              >
                <Text style={[
                  styles.gridOptionText,
                  formData.preferredDays?.includes(day) && styles.gridOptionTextSelected
                ]}>
                  {day}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>{t('profile.preferredJobTypes')}</Text>
          <View style={styles.optionsGrid}>
            {jobTypes.map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.gridOption,
                  formData.preferredJobTypes?.includes(type) && styles.gridOptionSelected
                ]}
                onPress={() => toggleJobType(type)}
              >
                <Text style={[
                  styles.gridOptionText,
                  formData.preferredJobTypes?.includes(type) && styles.gridOptionTextSelected
                ]}>
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>{t('profile.save')}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0fdf4',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
  },
  closeButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1f2937',
    marginBottom: 20,
  },
  photoSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  photoContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#10B981',
  },
  photoPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#f0fdf4',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#10B981',
    borderStyle: 'dashed',
  },
  uploadBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#ffffff',
  },
  photoText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#10B981',
  },
  label: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1f2937',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  halfInput: {
    flex: 1,
  },
  segmentedControl: {
    flexDirection: 'row',
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    padding: 4,
    marginBottom: 16,
  },
  segment: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  segmentActive: {
    backgroundColor: '#10B981',
    shadowColor: '#10B981',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  segmentText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#6b7280',
  },
  segmentTextActive: {
    color: '#ffffff',
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  gridOption: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 2,
    borderColor: '#e5e7eb',
  },
  gridOptionSelected: {
    backgroundColor: '#f0fdf4',
    borderColor: '#10B981',
  },
  gridOptionText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#374151',
    textTransform: 'capitalize',
  },
  gridOptionTextSelected: {
    color: '#10B981',
  },
  footer: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  saveButton: {
    backgroundColor: '#10B981',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#10B981',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  saveButtonText: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
  },
});