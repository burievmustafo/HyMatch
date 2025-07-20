import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { SwipeCards } from '@/components/SwipeCards';
import { LinearGradient } from 'expo-linear-gradient';
import { Menu, Filter } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useLanguage } from '@/contexts/LanguageContext';
import { ProfileIncompleteModal } from '@/components/ProfileIncompleteModal';
import { HamburgerMenu } from '@/components/HamburgerMenu';

export default function HomeScreen() {
  const router = useRouter();
  const { t } = useLanguage();

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#10B981', '#059669', '#047857']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <HamburgerMenu />
          
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{t('app.title')}</Text>
            <Text style={styles.subtitle}>{t('app.subtitle')}</Text>
          </View>
          
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => router.push('/filter')}
          >
            <Filter size={24} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </LinearGradient>
      
      <View style={styles.content}>
        <SwipeCards />
      </View>
      
      <ProfileIncompleteModal />
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
    paddingBottom: 30,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    alignItems: 'center',
    flex: 1,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#d1fae5',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
});