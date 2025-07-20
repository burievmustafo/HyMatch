import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface WorkDayBadgeProps {
  day: string;
  size?: 'small' | 'normal';
}

export function WorkDayBadge({ day, size = 'normal' }: WorkDayBadgeProps) {
  const isWeekend = day === 'Sat' || day === 'Sun';
  const isSmall = size === 'small';
  
  return (
    <View style={[
      styles.badge,
      isWeekend && styles.weekendBadge,
      isSmall && styles.smallBadge
    ]}>
      <Text style={[
        styles.text,
        isWeekend && styles.weekendText,
        isSmall && styles.smallText
      ]}>
        {day}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#e5e7eb',
    marginRight: 8,
    marginBottom: 8,
  },
  smallBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 4,
    marginBottom: 4,
  },
  weekendBadge: {
    backgroundColor: '#fee2e2',
  },
  text: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#374151',
  },
  smallText: {
    fontSize: 10,
  },
  weekendText: {
    color: '#dc2626',
  },
});