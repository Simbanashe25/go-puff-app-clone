import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  Animated,
  useWindowDimensions,
} from 'react-native';
import { Product } from '../data/products';
import { GOPUFF_FONTS } from '../constants/theme';
import { LoadingSkeleton } from './LoadingSkeleton';

const PLUS_ICON = require('../../assets/icons/plus (2).svg');
const TRASH_ICON = require('../../assets/icons/trash (2).svg');

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onRemoveFromCart?: (product: Product) => void;
  onPress?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onRemoveFromCart,
  onPress,
}) => {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;
  const [quantity, setQuantity] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  const handleAdd = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.2,
        duration: 80,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 80,
        useNativeDriver: true,
      }),
    ]).start();

    setQuantity((prev) => prev + 1);
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  const handleDecrease = (event?: { stopPropagation?: () => void }) => {
    event?.stopPropagation?.();
    setQuantity((previous) => {
      if (previous > 0) {
        onRemoveFromCart?.(product);
      }
      return Math.max(0, previous - 1);
    });
  };

  const isPeekingCard = (product.cardWidth || 160) < 100;
  const cardWidth = product.cardWidth || 160;
  const isDiscounted = product.originalPrice > product.price;

  return (
    <TouchableOpacity
      activeOpacity={0.92}
      onPress={() => onPress && onPress(product)}
      style={[
        styles.cardContainer,
        { width: cardWidth },
        isPeekingCard && styles.peekingCard,
      ]}
    >
      {/* 1. Image Area with High-Res Packshot */}
      <View style={styles.imageArea}>
        {!imageLoaded && <LoadingSkeleton style={styles.imageSkeleton} />}
        <Image
          source={product.imageSource}
          style={styles.packshotImage}
          resizeMode="contain"
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageLoaded(true)}
        />

        {/* Crisp Native Mint Green Discount Pill */}
        {product.discount && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{product.discount}</Text>
          </View>
        )}

        {/* Floating Add (+) Button on bottom-right of image */}
        {!isPeekingCard && (
          <Animated.View
            style={[
              styles.addButtonWrapper,
              quantity > 0 && styles.quantityControl,
              { transform: [{ scale: scaleAnim }] },
            ]}
          >
            {quantity === 0 ? (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={handleAdd}
                style={styles.addButton}
                accessibilityLabel={`Add ${product.name} to cart`}
              >
                <Image source={PLUS_ICON} style={styles.plusIcon} />
              </TouchableOpacity>
            ) : (
              <View style={styles.quantityPill}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={handleDecrease}
                  style={styles.quantityAction}
                  accessibilityLabel={`Remove one ${product.name}`}
                >
                  {quantity === 1 ? (
                    <Image source={TRASH_ICON} style={styles.trashIcon} />
                  ) : (
                    <Text style={styles.minusText}>−</Text>
                  )}
                </TouchableOpacity>
                <Text style={styles.quantityText}>{quantity}</Text>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={handleAdd}
                  style={styles.quantityAction}
                  accessibilityLabel={`Add another ${product.name}`}
                >
                  <Image source={PLUS_ICON} style={styles.plusIcon} />
                </TouchableOpacity>
              </View>
            )}
          </Animated.View>
        )}
      </View>

      {/* 2. Text Content Area with Sharp Native Typography */}
      <View style={styles.contentArea}>
        {isDesktop && !imageLoaded ? (
          <View style={styles.contentSkeleton}>
            <LoadingSkeleton style={styles.titleSkeleton} />
            <LoadingSkeleton style={styles.titleSkeletonShort} />
            <LoadingSkeleton style={styles.priceSkeleton} />
            <LoadingSkeleton style={styles.unitSkeleton} />
          </View>
        ) : (
          <>
            <Text numberOfLines={2} style={styles.titleText}>
              {product.name}
            </Text>
            <View style={styles.priceRow}>
              <Text style={[styles.salePrice, !isDiscounted && styles.regularPrice]}>
                ${product.price.toFixed(2)}
              </Text>
              {isDiscounted && (
                <Text style={styles.originalPrice}>
                  ${product.originalPrice.toFixed(2)}
                </Text>
              )}
            </View>
            <Text style={styles.unitInfoText}>{product.unitInfo}</Text>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    height: 270,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    overflow: 'visible',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 3,
    ...Platform.select({
      web: {
        cursor: 'pointer',
        boxShadow: '0 3px 10px rgba(15, 23, 42, 0.12)',
        transition: 'transform 0.15s ease, box-shadow 0.15s ease',
        ':hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 7px 18px rgba(15, 23, 42, 0.18)',
        },
      } as any,
    }),
  },
  peekingCard: {
    borderRightWidth: 0,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  imageArea: {
    width: '100%',
    height: 150,
    backgroundColor: '#FFFFFF',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },
  imageSkeleton: {
    ...StyleSheet.absoluteFillObject,
    margin: 4,
    borderRadius: 12,
    zIndex: 1,
  },
  packshotImage: {
    width: '100%',
    height: '100%',
  },
  discountBadge: {
    position: 'absolute',
    top: 6,
    left: 6,
    backgroundColor: '#34E49A',
    paddingVertical: 2,
    paddingHorizontal: 7,
    borderRadius: 8,
    zIndex: 10,
  },
  discountText: {
    fontFamily: GOPUFF_FONTS.family,
    fontSize: 10,
    fontWeight: '900', // Black
    color: '#000000',
    letterSpacing: 0.2,
  },
  addButtonWrapper: {
    position: 'absolute',
    bottom: 4,
    right: 10,
    zIndex: 15,
  },
  quantityControl: {
    right: 4,
    bottom: 6,
  },
  addButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      web: {
        boxShadow: '0 2px 7px rgba(15, 23, 42, 0.18)',
        cursor: 'pointer',
        transition: 'transform 0.1s ease',
        ':hover': {
          transform: 'scale(1.08)',
          backgroundColor: '#FFFFFF',
        },
      } as any,
    }),
  },
  plusIcon: {
    width: 18,
    height: 18,
  },
  trashIcon: {
    width: 18,
    height: 18,
  },
  quantityPill: {
    width: 132,
    height: 38,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    ...Platform.select({
      web: {
        boxShadow: '0 2px 7px rgba(15, 23, 42, 0.18)',
      } as any,
    }),
  },
  quantityAction: {
    width: 30,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  minusText: {
    fontFamily: GOPUFF_FONTS.family,
    fontSize: 26,
    lineHeight: 28,
    color: '#666666',
  },
  quantityText: {
    fontFamily: GOPUFF_FONTS.family,
    fontSize: 22,
    lineHeight: 26,
    fontWeight: '900',
    fontStyle: 'italic',
    color: '#8000FF',
  },
  qtyBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#8000FF',
    borderRadius: 9,
    minWidth: 17,
    height: 17,
    paddingHorizontal: 4,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  qtyBadgeText: {
    fontFamily: GOPUFF_FONTS.family,
    fontSize: 9.5,
    fontWeight: '900', // Black
    color: '#FFFFFF',
  },
  contentArea: {
    paddingHorizontal: 10,
    paddingTop: 16,
    paddingBottom: 10,
    justifyContent: 'space-between',
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
  },
  contentSkeleton: {
    gap: 8,
    paddingTop: 2,
  },
  titleSkeleton: {
    width: '100%',
    height: 10,
    borderRadius: 4,
  },
  titleSkeletonShort: {
    width: '76%',
    height: 10,
    borderRadius: 4,
  },
  priceSkeleton: {
    width: '48%',
    height: 11,
    borderRadius: 4,
    marginTop: 4,
  },
  unitSkeleton: {
    width: '64%',
    height: 8,
    borderRadius: 4,
  },
  titleText: {
    fontFamily: GOPUFF_FONTS.family,
    fontSize: 15,
    fontWeight: '400',
    color: '#111111',
    lineHeight: 18,
    height: 36,
    ...Platform.select({
      web: {
        userSelect: 'none' as any,
      },
    }),
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 4,
  },
  salePrice: {
    fontFamily: GOPUFF_FONTS.family,
    fontSize: 13.5,
    fontWeight: '400',
    color: '#00875A',
    letterSpacing: -0.2,
  },
  regularPrice: {
    color: '#8C8C8C',
  },
  originalPrice: {
    fontFamily: GOPUFF_FONTS.family,
    fontSize: 11,
    fontWeight: '400',
    color: '#8C8C8C',
    textDecorationLine: 'line-through',
    marginLeft: 5,
  },
  unitInfoText: {
    fontFamily: GOPUFF_FONTS.family,
    fontSize: 10.5,
    fontWeight: '400', // Regular
    color: '#8C8C8C',
    marginTop: 6,
  },
});
