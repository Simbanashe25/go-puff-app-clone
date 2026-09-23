import React, { useEffect, useRef } from 'react';
import { Animated, Platform, StyleProp, StyleSheet, ViewStyle } from 'react-native';

interface LoadingSkeletonProps {
  style?: StyleProp<ViewStyle>;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ style }) => {
  const opacity = useRef(new Animated.Value(0.45)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.9,
          duration: 700,
          useNativeDriver: Platform.OS !== 'web',
        }),
        Animated.timing(opacity, {
          toValue: 0.45,
          duration: 700,
          useNativeDriver: Platform.OS !== 'web',
        }),
      ]),
    );
    animation.start();
    return () => animation.stop();
  }, [opacity]);

  return <Animated.View style={[styles.base, style, { opacity }]} />;
};

const styles = StyleSheet.create({
  base: {
    backgroundColor: '#E5E7EB',
    borderRadius: 6,
  },
});
