import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Job } from '@/types/Job';
import { JobTypeIcon } from './JobTypeIcon';
import { WorkDayBadge } from './WorkDayBadge';
import { Clock, MapPin, BookOpen } from 'lucide-react-native';

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
  return (
    <View style={styles.card}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <JobTypeIcon type={job.type} />
          <Text style={styles.title}>{job.title}</Text>
        </View>

        <View style={styles.salaryContainer}>
          <Text style={styles.salary}>{job.salary}</Text>
          <Text style={styles.salaryPeriod}>per day</Text>
        </View>

        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <BookOpen size={16} color="#6b7280" />
            <Text style={styles.infoLabel}>Japanese Level:</Text>
            <Text style={styles.infoValue}>{job.japaneseLevel}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Clock size={16} color="#6b7280" />
            <Text style={styles.infoLabel}>Commute:</Text>
            <Text style={styles.infoValue}>{job.commuteTime}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <MapPin size={16} color="#6b7280" />
            <Text style={styles.infoLabel}>Location:</Text>
            <Text style={styles.infoValue}>{job.location}</Text>
          </View>
        </View>

        <View style={styles.workDaysSection}>
          <Text style={styles.sectionTitle}>Available Days</Text>
          <View style={styles.workDaysContainer}>
            {job.workDays.map((day, index) => (
              <WorkDayBadge key={index} day={day} />
            ))}
          </View>
        </View>

        {job.highlights && job.highlights.length > 0 && (
          <View style={styles.highlightsSection}>
            <Text style={styles.sectionTitle}>Highlights</Text>
            {job.highlights.map((highlight, index) => (
              <View key={index} style={styles.highlightItem}>
                <View style={styles.highlightBullet} />
                <Text style={styles.highlightText}>{highlight}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  content: {
    flex: 1,
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1f2937',
    textAlign: 'center',
    marginTop: 12,
  },
  salaryContainer: {
    alignItems: 'center',
    marginBottom: 24,
    paddingVertical: 16,
    backgroundColor: '#f0f9ff',
    borderRadius: 12,
  },
  salary: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#3B82F6',
  },
  salaryPeriod: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6b7280',
    marginTop: 4,
  },
  infoSection: {
    marginBottom: 24,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6b7280',
    marginLeft: 8,
    flex: 1,
  },
  infoValue: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
  },
  workDaysSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
    marginBottom: 12,
  },
  workDaysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  highlightsSection: {
    marginBottom: 16,
  },
  highlightItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  highlightBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
    marginRight: 12,
  },
  highlightText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#374151',
    flex: 1,
  },
});