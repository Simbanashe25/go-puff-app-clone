import React, { useMemo, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { Product } from '../data/products';
import { GOPUFF_FONTS } from '../constants/theme';
import { ProductCard } from './ProductCard';

interface SearchResultsScreenProps {
  query: string;
  products: Product[];
  onProductPress: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onBack: () => void;
}

export const SearchResultsScreen: React.FC<SearchResultsScreenProps> = ({
  query,
  products,
  onProductPress,
  onAddToCart,
  onBack,
}) => {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const [sort, setSort] = useState<'relevant' | 'low' | 'high'>('relevant');
  const [dealsOnly, setDealsOnly] = useState(false);
  const [nutritionOnly, setNutritionOnly] = useState(false);
  const [categoryIndex, setCategoryIndex] = useState(-1);
  const [brandIndex, setBrandIndex] = useState(-1);
  const [inStockOnly, setInStockOnly] = useState(false);
  const normalizedQuery = query.trim().toLowerCase();
  const categories = useMemo(
    () => Array.from(new Set(products.map((product) => product.categoryId).filter(Boolean))) as string[],
    [products],
  );
  const brands = useMemo(
    () => Array.from(new Set(products.map((product) => product.name.trim().split(/\s+/)[0]))),
    [products],
  );
  const matchingProducts = useMemo(() => {
    const source = products.filter((product) => {
      const matchesQuery = product.name.replace(/\n/g, ' ').toLowerCase().includes(normalizedQuery);
      const matchesDeals = !dealsOnly || Boolean(product.discount);
      const matchesNutrition = !nutritionOnly || Boolean(product.nutrition?.length);
      const matchesCategory = categoryIndex < 0 || product.categoryId === categories[categoryIndex];
      const brand = product.name.trim().split(/\s+/)[0];
      const matchesBrand = brandIndex < 0 || brand === brands[brandIndex];
      return matchesQuery && matchesDeals && matchesNutrition && matchesCategory && matchesBrand && (!inStockOnly || true);
    });
    if (sort === 'low') return [...source].sort((a, b) => a.price - b.price);
    if (sort === 'high') return [...source].sort((a, b) => b.price - a.price);
    return source;
  }, [normalizedQuery, products, sort, dealsOnly, nutritionOnly, categoryIndex, brandIndex, inStockOnly, categories, brands]);

  const filters = [
    { label: '☰', iconOnly: true },
    { label: dealsOnly ? 'Deals On' : 'Deals', icon: 'flame-outline' as const },
    { label: sort === 'relevant' ? 'Sort By' : sort === 'low' ? 'Price: Low' : 'Price: High', icon: 'chevron-down' as const },
    { label: nutritionOnly ? 'Nutrition On' : 'Nutrition', icon: 'chevron-down' as const },
    { label: categoryIndex < 0 ? 'Category' : categories[categoryIndex], icon: 'chevron-down' as const },
    { label: brandIndex < 0 ? 'Brands' : brands[brandIndex], icon: 'chevron-down' as const },
    { label: inStockOnly ? 'In Stock' : 'Show in Stock', icon: undefined },
  ];

  const handleFilterPress = (label: string) => {
    if (label === 'Deals' || label === 'Deals On') {
      setDealsOnly((current) => !current);
    } else if (label.startsWith('Sort By') || label.startsWith('Price:')) {
      setSort((current) => (current === 'relevant' ? 'low' : current === 'low' ? 'high' : 'relevant'));
    } else if (label === 'Nutrition' || label === 'Nutrition On') {
      setNutritionOnly((current) => !current);
    } else if (label === 'Category' || categories.includes(label)) {
      setCategoryIndex((current) => categories.length ? (current + 1) % (categories.length + 1) - 1 : -1);
    } else if (label === 'Brands' || brands.includes(label)) {
      setBrandIndex((current) => brands.length ? (current + 1) % (brands.length + 1) - 1 : -1);
    } else if (label === 'Show in Stock' || label === 'In Stock') {
      setInStockOnly((current) => !current);
    }
  };

  return (
    <View style={styles.screen}>
      <ScrollView
        showsVerticalScrollIndicator
        contentContainerStyle={[styles.content, isMobile && styles.contentMobile]}
      >
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Feather name="arrow-left" size={18} color="#111111" />
          <Text style={styles.backText}>Back to shopping</Text>
        </TouchableOpacity>
        <Text style={[styles.title, isMobile && styles.titleMobile]}>
          {matchingProducts.length} RESULTS FOR "{query.trim().toUpperCase()}"
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filters}
        >
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter.label}
              style={[styles.filterChip, filter.iconOnly && styles.iconChip]}
              onPress={() => handleFilterPress(filter.label)}
            >
              {filter.iconOnly ? (
                <Feather name="sliders" size={19} color="#111111" />
              ) : filter.icon === 'flame-outline' ? (
                <Ionicons name="flame-outline" size={23} color="#777777" />
              ) : null}
              <Text style={styles.filterText}>{filter.iconOnly ? '' : filter.label}</Text>
              {!filter.iconOnly && filter.icon === 'chevron-down' && (
                <Feather name="chevron-down" size={18} color="#111111" />
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
        <View style={[styles.grid, isMobile && styles.gridMobile]}>
          {matchingProducts.length > 0 ? matchingProducts.map((product) => (
            <View key={product.id} style={styles.gridItem}>
              <ProductCard product={product} onPress={onProductPress} onAddToCart={onAddToCart} />
            </View>
          )) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyTitle}>NO PRODUCTS FOUND.</Text>
              <Text style={styles.emptyText}>Try removing a filter or searching for something else.</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#FAFAFA' },
  content: { paddingHorizontal: 48, paddingTop: 34, paddingBottom: 48 },
  contentMobile: { paddingHorizontal: 16, paddingTop: 22 },
  backButton: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 18 },
  backText: { fontFamily: GOPUFF_FONTS.family, fontSize: 16, color: '#555555' },
  title: { fontFamily: GOPUFF_FONTS.family, fontSize: 40, fontWeight: '900', fontStyle: 'italic', color: '#050505', marginBottom: 38 },
  titleMobile: { fontSize: 27, lineHeight: 32, marginBottom: 22 },
  filters: { gap: 9, paddingBottom: 48 },
  filterChip: { height: 46, paddingHorizontal: 17, borderRadius: 24, backgroundColor: '#FFFFFF', flexDirection: 'row', alignItems: 'center', gap: 8, shadowColor: '#111111', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 3 },
  iconChip: { width: 70, paddingHorizontal: 0, justifyContent: 'center' },
  filterText: { fontFamily: GOPUFF_FONTS.family, fontSize: 17, fontWeight: '600', color: '#707070' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', columnGap: 36, rowGap: 26 },
  gridMobile: { columnGap: 16, rowGap: 20, justifyContent: 'space-between' },
  gridItem: { marginBottom: 2 },
  emptyState: { width: '100%', alignItems: 'center', paddingVertical: 64 },
  emptyTitle: { fontFamily: GOPUFF_FONTS.black, fontSize: 24, fontWeight: '900', fontStyle: 'italic', color: '#111111' },
  emptyText: { fontFamily: GOPUFF_FONTS.regular, fontSize: 16, color: '#666666', marginTop: 10 },
});
