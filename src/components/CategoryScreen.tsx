import React, { useMemo, useState } from 'react';
import {
  Image,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { CategoryItem, GOPUFF_CATEGORIES } from '../data/categories';
import { Product } from '../data/products';
import { GOPUFF_FONTS } from '../constants/theme';
import { ProductCard } from './ProductCard';

const SUBCATEGORIES: Record<string, string[]> = {
  deals: ['Exclusive Deals', 'Bundles', 'Price Drops'],
  apm: ['All Aldi Price Match', 'Fruit & Veg', 'Meat & Fish', 'Pantry Essentials'],
  'asian-mart': ['All Asian Mart', 'Noodles & Rice', 'Sauces & Spices', 'Snacks & Drinks'],
  'fruit-veg': ['Fresh Fruit', 'All Fruit', 'Prepared Fruit', 'Berries & Grapes', 'Exotic & Tropical Fruit'],
  'eggs-dairy': ['Milk', 'Eggs', 'Cheese', 'Yogurts', 'Butter & Spreads'],
  bakery: ['Bread', 'Rolls & Baguettes', 'Cakes & Pastries', 'Breakfast Bakery'],
  'meat-fish': ['Chicken', 'Beef', 'Pork', 'Fish', 'Vegetarian & Vegan'],
  alcohol: ['Beer & Cider', 'Lager', 'Large Packs', 'Small Packs', 'Singles'],
  drinks: ['Soft Drinks', 'Water', 'Juices', 'Energy Drinks', 'Coffee & Tea'],
  snacks: ['Crisps', 'Popcorn', 'Nuts', 'Savoury Snacks'],
  confectionery: ['Chocolate', 'Sweets', 'Gum & Mints', 'Biscuits'],
  'ice-cream': ['Ice Cream', 'Ice Lollies', 'Frozen Desserts', 'Toppings'],
};

interface CategoryScreenProps {
  category: CategoryItem;
  products: Product[];
  onCategorySelect: (category: CategoryItem) => void;
  onProductPress: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onBack: () => void;
  initialSubcategory?: string;
}

export const CategoryScreen: React.FC<CategoryScreenProps> = ({
  category,
  products,
  onCategorySelect,
  onProductPress,
  onAddToCart,
  onBack,
  initialSubcategory,
}) => {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const [selectedSubcategory, setSelectedSubcategory] = useState(
    initialSubcategory || SUBCATEGORIES[category.id]?.[0] || 'All Products',
  );
  React.useEffect(() => {
    setSelectedSubcategory(
      initialSubcategory || SUBCATEGORIES[category.id]?.[0] || 'All Products',
    );
  }, [category.id, initialSubcategory]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('filter');
  const [sortOption, setSortOption] = useState('Most Relevant');
  const [nutritionFilters, setNutritionFilters] = useState<string[]>([]);
  const categoryProducts = useMemo(
    () => products.filter((product) => product.categoryId === category.id),
    [category.id, products],
  );
  const visibleProducts = useMemo(() => {
    const source = categoryProducts.length ? categoryProducts : products.slice(0, 8);
    if (sortOption === 'Price: Low to High') {
      return [...source].sort((a, b) => a.price - b.price);
    }
    if (sortOption === 'Price: High to Low') {
      return [...source].sort((a, b) => b.price - a.price);
    }
    return source;
  }, [categoryProducts, products, sortOption]);
  const title = category.label.replace(/\n/g, ' ').toUpperCase();

  return (
    <View style={styles.screen}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator
      >
        <View style={[styles.body, isMobile && styles.bodyMobile]}>
          {!isMobile && <View style={styles.sidebar}>
            <TouchableOpacity onPress={onBack} style={styles.backButton}>
              <Feather name="arrow-left" size={18} color="#111111" />
              <Text style={styles.backText}>All categories</Text>
            </TouchableOpacity>
            <Text style={styles.sidebarLabel}>GROCERY</Text>
            <Text style={styles.sidebarTitle}>{title}</Text>
            {(SUBCATEGORIES[category.id] || ['All Products']).map((item, index) => (
              <TouchableOpacity
                key={item}
                onPress={() => setSelectedSubcategory(item)}
                style={[
                  styles.sidebarItem,
                  item === selectedSubcategory && styles.sidebarItemActive,
                ]}
              >
                <Text style={[styles.sidebarItemText, item === selectedSubcategory && styles.sidebarItemTextActive]}>
                  {item}
                </Text>
                {item === selectedSubcategory && <Ionicons name="chevron-up" size={18} color="#111111" />}
              </TouchableOpacity>
            ))}
          </View>}

          <View style={[styles.content, isMobile && styles.contentMobile]}>
            <View style={styles.titleRow}>
              <TouchableOpacity onPress={onBack} style={styles.mobileBack}>
                <Feather name="arrow-left" size={18} color="#111111" />
              </TouchableOpacity>
              <Text style={[styles.pageTitle, isMobile && styles.pageTitleMobile]}>
                {isMobile ? 'GROCERY.' : `${title}.`}
              </Text>
              <Text style={styles.itemCount}>{categoryProducts.length || visibleProducts.length} ITEMS  ›</Text>
            </View>

            {!isMobile && <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filters}
            >
              {['☰', '🔥 Deals', 'Sort By', 'Nutrition', 'Category', 'Brands', 'Show in Stock'].map((filter) => (
                <TouchableOpacity
                  key={filter}
                  style={styles.filterChip}
                  onPress={() => {
                    setActiveFilter(
                      filter === '☰'
                        ? 'filter'
                        : filter.includes('Deals')
                          ? 'deals'
                          : filter.toLowerCase(),
                    );
                    setIsFilterOpen(true);
                  }}
                >
                  <Text style={styles.filterText}>{filter}</Text>
                  {filter !== '☰' && <Ionicons name="chevron-down" size={16} color="#6B7280" />}
                </TouchableOpacity>
              ))}
            </ScrollView>}

            <View style={[styles.banner, isMobile && styles.bannerMobile]}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=1400&q=85' }}
                style={styles.bannerImage}
                resizeMode="cover"
              />
              <View style={styles.bannerOverlay}>
                <Text style={styles.bannerTitle}>3 FOR 2{'\n'}{title}.</Text>
                <TouchableOpacity style={styles.shopButton}>
                  <Text style={styles.shopButtonText}>SHOP NOW</Text>
                </TouchableOpacity>
              </View>
            </View>

            <CategoryProductRow
              title={isMobile ? `${title} DEALS` : selectedSubcategory.toUpperCase()}
              products={visibleProducts}
              onAddToCart={onAddToCart}
              onProductPress={onProductPress}
            />
            {visibleProducts.length > 4 && (
              <CategoryProductRow
                title={`${title} & MORE`}
                products={[...visibleProducts].reverse()}
                onAddToCart={onAddToCart}
                onProductPress={onProductPress}
              />
            )}
          </View>
        </View>
      </ScrollView>
      {isMobile && (
        <TouchableOpacity
          style={styles.mobileFilterButton}
          onPress={() => setIsFilterOpen(true)}
          activeOpacity={0.9}
        >
          <Feather name="sliders" size={24} color="#111111" />
          <Text style={styles.mobileFilterText}>Filter & Sort</Text>
        </TouchableOpacity>
      )}
      <FilterSheet
        visible={isFilterOpen}
        isMobile={isMobile}
        activeFilter={activeFilter}
        sortOption={sortOption}
        nutritionFilters={nutritionFilters}
        onClose={() => setIsFilterOpen(false)}
        onSortChange={setSortOption}
        onNutritionChange={setNutritionFilters}
      />
    </View>
  );
};

const FilterSheet: React.FC<{
  visible: boolean;
  isMobile: boolean;
  activeFilter: string;
  sortOption: string;
  nutritionFilters: string[];
  onClose: () => void;
  onSortChange: (value: string) => void;
  onNutritionChange: (values: string[]) => void;
}> = ({
  visible,
  isMobile,
  activeFilter,
  sortOption,
  nutritionFilters,
  onClose,
  onSortChange,
  onNutritionChange,
}) => {
  const sortOptions = ['Most Relevant', 'Price: Low to High', 'Price: High to Low'];
  const nutritionOptions = ['Organic', 'Gluten Free', 'Vegan', 'High Protein', 'Dairy Free', 'No Sugar Added'];
  const title = activeFilter === 'nutrition'
    ? 'NUTRITION.'
    : activeFilter === 'sort by'
      ? 'SORT BY.'
      : activeFilter === 'category'
        ? 'CATEGORY.'
        : activeFilter === 'brands'
          ? 'BRANDS.'
          : activeFilter === 'show in stock'
            ? 'SHOW IN STOCK.'
              : activeFilter === 'deals'
                ? 'DEALS.'
              : 'FILTER & SORT.';
  const isSortModal = activeFilter === 'filter' || activeFilter === 'sort by';
  const optionList =
    activeFilter === 'nutrition'
      ? nutritionOptions
      : activeFilter === 'category'
        ? ['Fruit & Veg', 'Eggs & Dairy', 'Bakery', 'Meat & Fish']
        : activeFilter === 'brands'
            ? ['Morrisons', 'GoPuff', 'Aldi Price Match']
            : activeFilter === 'show in stock'
              ? ['Show in stock only']
              : activeFilter === 'deals'
                ? ['All deals', 'Discounted items', 'Bundles']
                : [];
  const toggleNutrition = (option: string) => {
    onNutritionChange(
      nutritionFilters.includes(option)
        ? nutritionFilters.filter((value) => value !== option)
        : [...nutritionFilters, option],
    );
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={[styles.sheetOverlay, !isMobile && styles.desktopOverlay]}>
        <TouchableOpacity style={styles.sheetBackdrop} onPress={onClose} activeOpacity={1} />
        <View style={[styles.filterSheet, !isMobile && styles.desktopFilterSheet]}>
          <TouchableOpacity style={styles.sheetClose} onPress={onClose}>
            <Feather name="x" size={30} color="#111111" />
          </TouchableOpacity>
          <ScrollView
            style={styles.filterScroll}
            contentContainerStyle={styles.filterScrollContent}
            showsVerticalScrollIndicator
          >
            <Text style={styles.sheetTitle}>{title}</Text>
            {isSortModal && <Text style={styles.filterSectionTitle}>Sort By</Text>}
            {isSortModal && sortOptions.map((option) => (
              <TouchableOpacity
                key={option}
                style={styles.filterOption}
                onPress={() => onSortChange(option)}
              >
                <Text style={styles.filterOptionText}>{option}</Text>
                <View style={[styles.radio, sortOption === option && styles.radioSelected]}>
                  {sortOption === option && <View style={styles.radioDot} />}
                </View>
              </TouchableOpacity>
            ))}
            {isSortModal && <View style={styles.sheetDivider} />}
            {!isSortModal && <Text style={styles.filterSectionTitle}>{activeFilter === 'nutrition' ? 'Nutrition' : 'Choose an option'}</Text>}
            {optionList.map((option) => (
              <TouchableOpacity
                key={option}
                style={styles.filterOption}
                onPress={() => toggleNutrition(option)}
              >
                <Text style={styles.filterOptionText}>{option}</Text>
                <View style={[styles.checkbox, nutritionFilters.includes(option) && styles.checkboxSelected]}>
                  {nutritionFilters.includes(option) && <Feather name="check" size={18} color="#FFFFFF" />}
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <View style={[styles.sheetActions, !isMobile && styles.desktopSheetActions]}>
            <TouchableOpacity style={styles.clearButton} onPress={() => {
              onSortChange('Most Relevant');
              onNutritionChange([]);
            }}>
              <Text style={styles.clearButtonText}>CLEAR ALL</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.resultsButton} onPress={onClose}>
              <Text style={styles.resultsButtonText}>SHOW RESULTS</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const CategoryProductRow: React.FC<{
  title: string;
  products: Product[];
  onAddToCart: (product: Product) => void;
  onProductPress: (product: Product) => void;
}> = ({ title, products, onAddToCart, onProductPress }) => (
  <View style={styles.productSection}>
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}.</Text>
      <Text style={styles.sectionCount}>{products.length} ITEMS  ›</Text>
    </View>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.productRow}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
          onPress={onProductPress}
        />
      ))}
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#FFFFFF' },
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: 40 },
  body: { flexDirection: 'row', width: '100%' },
  bodyMobile: { flexDirection: 'column' },
  sidebar: { width: 250, flexShrink: 0, padding: 28, borderRightWidth: 1, borderRightColor: '#E5E7EB' },
  backButton: { flexDirection: 'row', alignItems: 'center', gap: 7, marginBottom: 25 },
  backText: { fontFamily: GOPUFF_FONTS.family, fontSize: 14, color: '#4B4B4B' },
  sidebarLabel: { fontFamily: GOPUFF_FONTS.family, color: '#666666', fontSize: 16, marginBottom: 12 },
  sidebarTitle: { fontFamily: GOPUFF_FONTS.family, fontSize: 21, fontWeight: '700', borderBottomWidth: 1, borderBottomColor: '#E5E7EB', paddingBottom: 14 },
  sidebarItem: { minHeight: 52, paddingHorizontal: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderRadius: 5 },
  sidebarItemActive: { backgroundColor: '#E2F4FD' },
  sidebarItemText: { fontFamily: GOPUFF_FONTS.family, fontSize: 17, color: '#777777' },
  sidebarItemTextActive: { color: '#111111', fontWeight: '700' },
  content: { flex: 1, minWidth: 0, padding: 32 },
  contentMobile: { padding: 20, paddingBottom: 100 },
  titleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  mobileBack: { display: 'none' },
  pageTitle: { fontFamily: GOPUFF_FONTS.family, fontSize: 40, fontWeight: '900', fontStyle: 'italic' },
  pageTitleMobile: { fontSize: 39, marginBottom: 24 },
  itemCount: { fontFamily: GOPUFF_FONTS.family, fontSize: 16, color: '#777777', fontWeight: '900', fontStyle: 'italic' },
  filters: { gap: 9, paddingVertical: 18 },
  filterChip: { minHeight: 44, paddingHorizontal: 16, borderRadius: 23, backgroundColor: '#FFFFFF', flexDirection: 'row', alignItems: 'center', gap: 8, ...Platform.select({ web: { boxShadow: '0 3px 9px rgba(15, 23, 42, 0.10)' } as any }) },
  filterText: { fontFamily: GOPUFF_FONTS.family, color: '#737373', fontSize: 15, fontWeight: '700' },
  banner: { height: 215, borderRadius: 28, overflow: 'hidden', position: 'relative', marginBottom: 28 },
  bannerMobile: { height: 116, borderRadius: 25, marginHorizontal: 4, marginBottom: 34 },
  bannerImage: { width: '100%', height: '100%' },
  bannerOverlay: { ...StyleSheet.absoluteFillObject, padding: 34, backgroundColor: 'rgba(4, 25, 37, 0.42)', justifyContent: 'space-between', alignItems: 'flex-start' },
  bannerTitle: { fontFamily: GOPUFF_FONTS.family, color: '#FFFFFF', fontSize: 30, lineHeight: 33, fontWeight: '900', fontStyle: 'italic' },
  shopButton: { borderWidth: 1, borderColor: '#FFFFFF', borderRadius: 20, paddingHorizontal: 13, paddingVertical: 7 },
  shopButtonText: { color: '#FFFFFF', fontFamily: GOPUFF_FONTS.family, fontSize: 12, fontWeight: '900', fontStyle: 'italic' },
  productSection: { marginTop: 20 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  sectionTitle: { fontFamily: GOPUFF_FONTS.family, fontSize: 28, fontWeight: '900', fontStyle: 'italic' },
  sectionCount: { fontFamily: GOPUFF_FONTS.family, fontSize: 16, color: '#777777', fontWeight: '900', fontStyle: 'italic' },
  productRow: { gap: 16, padding: 8, paddingBottom: 18 },
  mobileFilterButton: { position: 'absolute', left: 28, right: 28, bottom: 14, height: 52, borderRadius: 27, borderWidth: 2, borderColor: '#4B4B4B', backgroundColor: '#FFFFFF', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 14, ...Platform.select({ web: { position: 'fixed' as any, boxShadow: '0 2px 12px rgba(15, 23, 42, 0.16)' } as any }) },
  mobileFilterText: { fontFamily: GOPUFF_FONTS.family, fontSize: 18, fontWeight: '700', color: '#4B4B4B' },
  sheetOverlay: { flex: 1, justifyContent: 'flex-end' },
  desktopOverlay: { justifyContent: 'center', alignItems: 'center' },
  sheetBackdrop: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0, 0, 0, 0.68)' },
  filterSheet: { backgroundColor: '#FFFFFF', borderTopLeftRadius: 24, borderTopRightRadius: 24, paddingHorizontal: 23, paddingBottom: 84, height: '85%', maxHeight: '85%' },
  desktopFilterSheet: { width: 960, maxWidth: 'calc(100% - 48px)' as any, borderRadius: 22, paddingBottom: 90, height: '80%', maxHeight: '80%' },
  filterScroll: { flex: 1, minHeight: 0 },
  filterScrollContent: { paddingTop: 70, paddingBottom: 20 },
  sheetClose: { position: 'absolute', right: 22, top: 20, padding: 2 },
  sheetTitle: { fontFamily: GOPUFF_FONTS.family, fontSize: 30, fontWeight: '900', fontStyle: 'italic', marginBottom: 48 },
  filterSectionTitle: { fontFamily: GOPUFF_FONTS.family, fontSize: 23, fontWeight: '900', marginBottom: 20 },
  filterOption: { minHeight: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 30 },
  filterOptionText: { fontFamily: GOPUFF_FONTS.family, fontSize: 20, color: '#4B4B4B', fontWeight: '700' },
  radio: { width: 35, height: 35, borderRadius: 18, borderWidth: 1, borderColor: '#AAAAAA', alignItems: 'center', justifyContent: 'center' },
  radioSelected: { borderColor: '#00A3FF', backgroundColor: '#00A3FF' },
  radioDot: { width: 13, height: 13, borderRadius: 7, backgroundColor: '#FFFFFF' },
  checkbox: { width: 35, height: 35, borderRadius: 5, borderWidth: 1, borderColor: '#AAAAAA', alignItems: 'center', justifyContent: 'center' },
  checkboxSelected: { backgroundColor: '#00A3FF', borderColor: '#00A3FF' },
  sheetDivider: { height: 1, backgroundColor: '#E5E7EB', marginVertical: 17 },
  sheetActions: { position: 'absolute', left: 23, right: 23, bottom: 14, flexDirection: 'row', gap: 12 },
  desktopSheetActions: { left: 23, right: 23, bottom: 16 },
  clearButton: { flex: 1, height: 49, borderRadius: 25, borderWidth: 2, borderColor: '#C7C7C7', alignItems: 'center', justifyContent: 'center' },
  clearButtonText: { fontFamily: GOPUFF_FONTS.family, fontSize: 16, fontWeight: '900', fontStyle: 'italic', color: '#AAAAAA' },
  resultsButton: { flex: 1, height: 49, borderRadius: 25, backgroundColor: '#1010F5', alignItems: 'center', justifyContent: 'center' },
  resultsButtonText: { fontFamily: GOPUFF_FONTS.family, fontSize: 16, fontWeight: '900', fontStyle: 'italic', color: '#FFFFFF' },
});
