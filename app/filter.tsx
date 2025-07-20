import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useJobs, JobFilters, SortOption } from '@/contexts/JobContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { X, Check } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function FilterModal() {
  const router = useRouter();
  const { filters, setFilters, sortBy, setSortBy } = useJobs();
  const { t } = useLanguage();
  const [localFilters, setLocalFilters] = useState<JobFilters>(filters);
  const [localSortBy, setLocalSortBy] = useState<SortOption>(sortBy);

  const jobTypes = ['cooking', 'delivery', 'warehouse', 'cleaning', 'retail', 'restaurant', 'office', 'construction'];
  const japaneseLevels = ['N1', 'N2', 'N3', 'N4', 'N5'];
  const workDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const sortOptions: { key: SortOption; label: string }[] = [
    { key: 'wage', label: t('sort.wage') },
    { key: 'commute', label: t('sort.commute') },
    { key: 'date', label: t('sort.date') },
  ];

  const handleApply = () => {
    setFilters(localFilters);
    setSortBy(localSortBy);
    router.back();
  };

  const handleReset = () => {
    const resetFilters: JobFilters = {
      jobTypes: [],
      wageRange: [0, 5000],
      japaneseLevels: [],
      workDays: [],
    };
    setLocalFilters(resetFilters);
    setLocalSortBy('date');
  };

  const toggleJobType = (type: string) => {
    setLocalFilters(prev => ({
      ...prev,
      jobTypes: prev.jobTypes.includes(type)
        ? prev.jobTypes.filter(t => t !== type)
        : [...prev.jobTypes, type]
    }));
  };

  const toggleJapaneseLevel = (level: string) => {
    setLocalFilters(prev => ({
      ...prev,
      japaneseLevels: prev.japaneseLevels.includes(level)
        ? prev.japaneseLevels.filter(l => l !== level)
        : [...prev.japaneseLevels, level]
    }));
  };

  const toggleWorkDay = (day: string) => {
    setLocalFilters(prev => ({
      ...prev,
      workDays: prev.workDays.includes(day)
        ? prev.workDays.filter(d => d !== day)
        : [...prev.workDays, day]
    }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#10B981', '#059669']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.title}>{t('filter.title')}</Text>
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
          <Text style={styles.sectionTitle}>{t('sort.title')}</Text>
          {sortOptions.map((option) => (
            <TouchableOpacity
              key={option.key}
              style={[
                styles.option,
                localSortBy === option.key && styles.optionSelected
              ]}
              onPress={() => setLocalSortBy(option.key)}
            >
              <Text style={[
                styles.optionText,
                localSortBy === option.key && styles.optionTextSelected
              ]}>
                {option.label}
              </Text>
              {localSortBy === option.key && (
                <Check size={20} color="#10B981" />
              )}
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('filter.jobType')}</Text>
          <View style={styles.optionsGrid}>
            {jobTypes.map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.gridOption,
                  localFilters.jobTypes.includes(type) && styles.gridOptionSelected
                ]}
                onPress={() => toggleJobType(type)}
              >
                <Text style={[
                  styles.gridOptionText,
                  localFilters.jobTypes.includes(type) && styles.gridOptionTextSelected
                ]}>
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('filter.japanese')}</Text>
          <View style={styles.optionsGrid}>
            {japaneseLevels.map((level) => (
              <TouchableOpacity
                key={level}
                style={[
                  styles.gridOption,
                  localFilters.japaneseLevels.includes(level) && styles.gridOptionSelected
                ]}
                onPress={() => toggleJapaneseLevel(level)}
              >
                <Text style={[
                  styles.gridOptionText,
                  localFilters.japaneseLevels.includes(level) && styles.gridOptionTextSelected
                ]}>
                  {level}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('filter.workDays')}</Text>
          <View style={styles.optionsGrid}>
            {workDays.map((day) => (
              <TouchableOpacity
                key={day}
                style={[
                  styles.gridOption,
                  localFilters.workDays.includes(day) && styles.gridOptionSelected
                ]}
                onPress={() => toggleWorkDay(day)}
              >
                <Text style={[
                  styles.gridOptionText,
                  localFilters.workDays.includes(day) && styles.gridOptionTextSelected
                ]}>
                  {day}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
          <Text style={styles.resetButtonText}>{t('filter.reset')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
          <Text style={styles.applyButtonText}>{t('filter.apply')}</Text>
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
    marginBottom: 16,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: '#e5e7eb',
  },
  optionSelected: {
    backgroundColor: '#f0fdf4',
    borderColor: '#10B981',
  },
  optionText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#374151',
  },
  optionTextSelected: {
    color: '#10B981',
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
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
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    gap: 12,
  },
  resetButton: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  resetButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#6b7280',
  },
  applyButton: {
    flex: 2,
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
  applyButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
  },
});