import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { JobCard } from './JobCard';
import { SwipeableCard } from './SwipeableCard';
import { useJobs } from '@/contexts/JobContext';
import { Job } from '@/types/Job';

const { width } = Dimensions.get('window');

export function SwipeCards() {
  const { jobs, addApplication, applications } = useJobs();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Filter out jobs that have already been swiped
  const appliedJobIds = applications.map(app => app.jobId);
  const availableJobs = jobs.filter(job => !appliedJobIds.includes(job.id));

  const handleSwipeRight = () => {
    if (currentIndex < availableJobs.length) {
      const job = availableJobs[currentIndex];
      addApplication(job.id, 'chosen');
      setCurrentIndex(prevIndex => prevIndex + 1);
    }
  };

  const handleSwipeLeft = () => {
    if (currentIndex < availableJobs.length) {
      const job = availableJobs[currentIndex];
      addApplication(job.id, 'refused');
      setCurrentIndex(prevIndex => prevIndex + 1);
    }
  };

  const visibleJobs = availableJobs.slice(currentIndex, currentIndex + 3);

  if (visibleJobs.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <JobCard 
          job={{
            id: 'empty',
            title: 'No more jobs available',
            type: 'office',
            salary: '¥0',
            japaneseLevel: 'N5',
            commuteTime: '0 minutes',
            location: 'Everywhere',
            workDays: [],
            highlights: ['Check back later for new opportunities!'],
          }}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {visibleJobs.map((job, index) => (
        <SwipeableCard
          key={job.id}
          onSwipeRight={handleSwipeRight}
          onSwipeLeft={handleSwipeLeft}
          isTop={index === 0}
          zIndex={visibleJobs.length - index}
          style={[
            styles.card,
            {
              transform: [
                { scale: 1 - index * 0.05 },
                { translateY: index * 10 },
              ],
            },
          ]}
        >
          <JobCard job={job} />
        </SwipeableCard>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    position: 'absolute',
    width: width - 40,
    height: 500,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: width - 40,
    height: 500,
  },
});