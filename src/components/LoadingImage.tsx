import React, { useState } from 'react';
import {
  Image,
  ImageProps,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { LoadingSkeleton } from './LoadingSkeleton';

interface LoadingImageProps extends Omit<ImageProps, 'style'> {
  imageStyle?: StyleProp<any>;
  containerStyle?: StyleProp<ViewStyle>;
  skeletonStyle?: StyleProp<ViewStyle>;
}

export const LoadingImage: React.FC<LoadingImageProps> = ({
  containerStyle,
  skeletonStyle,
  onLoad,
  onError,
  imageStyle,
  ...props
}) => {
  const [loaded, setLoaded] = useState(false);

  const handleLoad: ImageProps['onLoad'] = (event) => {
    setLoaded(true);
    onLoad?.(event);
  };

  const handleError: ImageProps['onError'] = (event) => {
    setLoaded(true);
    onError?.(event);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {!loaded && <LoadingSkeleton style={[styles.skeleton, skeletonStyle]} />}
      <Image {...props} style={[styles.image, imageStyle]} onLoad={handleLoad} onError={handleError} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  skeleton: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
});
