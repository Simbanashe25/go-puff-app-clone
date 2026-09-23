import React, { useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Product, EXACT_CAROUSEL_PRODUCTS } from '../data/products';
import { GOPUFF_FONTS } from '../constants/theme';
import { ProductCard } from './ProductCard';

interface ProductsSectionProps {
  title?: string;
  subtitle?: string;
  products?: Product[];
  onAddToCart?: (product: Product) => void;
  onRemoveFromCart?: (product: Product) => void;
  onProductPress?: (product: Product) => void;
  onSeeAllPress?: () => void;
  seeAllLabel?: string;
  itemCount?: number;
}

export const ProductsSection: React.FC<ProductsSectionProps> = ({
  title = 'DEALS & EXCLUSIVE BUNDLES',
  subtitle,
  products = EXACT_CAROUSEL_PRODUCTS,
  onAddToCart,
  onRemoveFromCart,
  onProductPress,
  onSeeAllPress,
  seeAllLabel = 'See all',
  itemCount,
}) => {
  const scrollRef = useRef<ScrollView>(null);

  return (
    <View style={styles.container}>
      {/* 1. Header Row */}
      <View style={styles.headerRow}>
        <View style={styles.titleColumn}>
          <Text style={styles.sectionTitle}>{title}</Text>
        </View>

        <View style={styles.headerRightControls}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onSeeAllPress}
            style={styles.seeAllButton}
          >
            <Text style={[styles.seeAllText, itemCount !== undefined && styles.itemCountText]}>
              {itemCount !== undefined ? `${itemCount} ITEMS` : seeAllLabel}
            </Text>
            <Feather
              name="chevron-right"
              size={16}
              color={itemCount !== undefined ? '#6B7280' : '#8000FF'}
            />
          </TouchableOpacity>

        </View>
      </View>

      {/* 2. Exact Cards Horizontal Carousel */}
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        style={styles.scrollView}
      >
        {products.map((product) => (
          <View key={product.id} style={styles.cardItemWrapper}>
            <ProductCard
              product={product}
              onAddToCart={onAddToCart}
              onRemoveFromCart={onRemoveFromCart}
              onPress={onProductPress}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 18,
    backgroundColor: '#FFFFFF',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 14,
    maxWidth: 1240,
    alignSelf: 'center',
    width: '100%',
  },
  titleColumn: {
    flex: 1,
  },
  sectionTitle: {
    fontFamily: GOPUFF_FONTS.family,
    fontSize: 22,
    fontWeight: '900', // Black
    color: '#0F172A',
    letterSpacing: -0.3,
    textTransform: 'uppercase',
  },
  sectionSubtitle: {
    fontFamily: GOPUFF_FONTS.family,
    fontSize: 12,
    fontWeight: '400', // Regular
    color: '#64748B',
    marginTop: 2,
  },
  headerRightControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeAllText: {
    fontFamily: GOPUFF_FONTS.family,
    fontSize: 14,
    fontWeight: '700', // Bold
    color: '#8000FF',
    marginRight: 2,
  },
  itemCountText: {
    color: '#6B7280',
    fontStyle: 'italic',
    fontWeight: '900',
    fontSize: 18,
  },
  scrollView: {
    flexGrow: 0,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    maxWidth: 1240,
  },
  cardItemWrapper: {
    marginRight: 2,
  },
});
