import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { JobListItem } from '@/components/JobListItem';
import { useJobs } from '@/contexts/JobContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Filter, Heart } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function ChosenScreen() {
  const { getChosenJobs } = useJobs();
  const { t } = useLanguage();
  const router = useRouter();
  const chosenJobs = getChosenJobs();

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#10B981', '#059669']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.title}>{t('tabs.chosen')}</Text>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => router.push('/filter')}
          >
            <Filter size={20} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </LinearGradient>
      
      {chosenJobs.length === 0 ? (
        <View style={styles.emptyState}>
          <View style={styles.emptyIcon}>
            <Heart size={64} color="#10B981" />
          </View>
          <Text style={styles.emptyText}>{t('empty.chosen')}</Text>
          <Text style={styles.emptySubtext}>{t('empty.chosenSub')}</Text>
        </View>
      ) : (
        <FlatList
          data={chosenJobs}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <JobListItem job={item} />}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
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
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
  },
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    padding: 20,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  emptyIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#f0fdf4',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    borderWidth: 3,
    borderColor: '#10B981',
  },
  emptyText: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1f2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    textAlign: 'center',
  },
});