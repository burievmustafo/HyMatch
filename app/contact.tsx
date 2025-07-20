import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Linking } from 'react-native';
import { useRouter } from 'expo-router';
import { useLanguage } from '@/contexts/LanguageContext';
import { X, Phone, Mail, MessageCircle } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function ContactModal() {
  const router = useRouter();
  const { t } = useLanguage();

  const handleCall = () => {
    Linking.openURL('tel:+81-3-1234-5678');
  };

  const handleEmail = () => {
    Linking.openURL('mailto:support@hymatch.jp');
  };

  const handleChat = () => {
    // Open chat support
    console.log('Open chat support');
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#10B981', '#059669']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.title}>{t('contact.title')}</Text>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => router.back()}
          >
            <X size={24} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        <Text style={styles.subtitle}>
          {t('contact.subtitle')}
        </Text>

        <TouchableOpacity style={styles.contactOption} onPress={handleCall}>
          <LinearGradient
            colors={['#10B981', '#059669']}
            style={styles.iconContainer}
          >
            <Phone size={24} color="#ffffff" />
          </LinearGradient>
          <View style={styles.contactInfo}>
            <Text style={styles.contactTitle}>{t('contact.phone')}</Text>
            <Text style={styles.contactDetail}>+81-3-1234-5678</Text>
            <Text style={styles.contactHours}>{t('contact.phoneDetail')}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.contactOption} onPress={handleEmail}>
          <LinearGradient
            colors={['#3B82F6', '#2563EB']}
            style={styles.iconContainer}
          >
            <Mail size={24} color="#ffffff" />
          </LinearGradient>
          <View style={styles.contactInfo}>
            <Text style={styles.contactTitle}>{t('contact.email')}</Text>
            <Text style={styles.contactDetail}>support@hymatch.jp</Text>
            <Text style={styles.contactHours}>{t('contact.emailDetail')}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.contactOption} onPress={handleChat}>
          <LinearGradient
            colors={['#F59E0B', '#D97706']}
            style={styles.iconContainer}
          >
            <MessageCircle size={24} color="#ffffff" />
          </LinearGradient>
          <View style={styles.contactInfo}>
            <Text style={styles.contactTitle}>{t('contact.chat')}</Text>
            <Text style={styles.contactDetail}>Chat with our team</Text>
            <Text style={styles.contactHours}>{t('contact.chatDetail')}</Text>
          </View>
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
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 32,
  },
  contactOption: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  contactInfo: {
    flex: 1,
  },
  contactTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  contactDetail: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#10B981',
    marginBottom: 4,
  },
  contactHours: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
  },
});