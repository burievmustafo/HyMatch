import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
  interpolate,
} from 'react-native-reanimated';
import { SwipeIndicator } from './SwipeIndicator';

interface SwipeableCardProps {
  children: React.ReactNode;
  onSwipeRight: () => void;
  onSwipeLeft: () => void;
  isTop: boolean;
  zIndex: number;
  style?: ViewStyle;
}

const SWIPE_THRESHOLD = 100;
const CARD_WIDTH = 300;

export function SwipeableCard({
  children,
  onSwipeRight,
  onSwipeLeft,
  isTop,
  zIndex,
  style,
}: SwipeableCardProps) {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const rotation = useSharedValue(0);
  const scale = useSharedValue(1);

  const gestureHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onStart: () => {
      scale.value = withSpring(0.95);
    },
    onActive: (event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;
      rotation.value = interpolate(
        event.translationX,
        [-CARD_WIDTH, 0, CARD_WIDTH],
        [-15, 0, 15]
      );
    },
    onEnd: (event) => {
      const shouldSwipeRight = event.translationX > SWIPE_THRESHOLD;
      const shouldSwipeLeft = event.translationX < -SWIPE_THRESHOLD;

      if (shouldSwipeRight) {
        translateX.value = withSpring(CARD_WIDTH * 2);
        translateY.value = withSpring(event.translationY);
        runOnJS(onSwipeRight)();
      } else if (shouldSwipeLeft) {
        translateX.value = withSpring(-CARD_WIDTH * 2);
        translateY.value = withSpring(event.translationY);
        runOnJS(onSwipeLeft)();
      } else {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
        rotation.value = withSpring(0);
      }
      scale.value = withSpring(1);
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotate: `${rotation.value}deg` },
        { scale: scale.value },
      ],
    };
  });

  const rightIndicatorStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateX.value,
      [0, SWIPE_THRESHOLD],
      [0, 1],
      'clamp'
    );
    return { opacity };
  });

  const leftIndicatorStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateX.value,
      [-SWIPE_THRESHOLD, 0],
      [1, 0],
      'clamp'
    );
    return { opacity };
  });

  return (
    <PanGestureHandler 
      onGestureEvent={gestureHandler} 
      enabled={isTop}
      activeOffsetX={[-15, 15]}
      activeOffsetY={[-1000, 1000]}
    >
      <Animated.View style={[styles.container, style, animatedStyle, { zIndex }]}>
        <View style={styles.content}>
          {children}
        </View>
        <SwipeIndicator
          type="right"
          style={[styles.rightIndicator, rightIndicatorStyle]}
        />
        <SwipeIndicator
          type="left"
          style={[styles.leftIndicator, leftIndicatorStyle]}
        />
      </Animated.View>
    </PanGestureHandler>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  rightIndicator: {
    position: 'absolute',
    top: 50,
    right: 20,
  },
  leftIndicator: {
    position: 'absolute',
    top: 50,
    left: 20,
  },
});