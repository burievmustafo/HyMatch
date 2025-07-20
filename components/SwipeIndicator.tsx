import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';
import { Check, X } from 'lucide-react-native';

interface SwipeIndicatorProps {
  type: 'left' | 'right';
  style?: ViewStyle;
}

export function SwipeIndicator({ type, style }: SwipeIndicatorProps) {
  const isRight = type === 'right';
  
  return (
    <Animated.View
      style={[
        styles.container,
        isRight ? styles.rightContainer : styles.leftContainer,
        style,
      ]}
    >
      {isRight ? (
        <Check size={24} color="#ffffff" strokeWidth={3} />
      ) : (
        <X size={24} color="#ffffff" strokeWidth={3} />
      )}
      <Text style={[styles.text, isRight ? styles.rightText : styles.leftText]}>
        {isRight ? 'CHOOSE' : 'PASS'}
      </Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  rightContainer: {
    backgroundColor: '#10B981',
  },
  leftContainer: {
    backgroundColor: '#EF4444',
  },
  text: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    color: '#ffffff',
  },
  rightText: {
    color: '#ffffff',
  },
  leftText: {
    color: '#ffffff',
  },
});