import React, { useState } from 'react';
import { Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { GOPUFF_FONTS } from '../constants/theme';
import { GOPUFF_CATEGORIES } from '../data/categories';

const APP_LOGO = require('../../assets/logo/now now logo.png');

interface NavigationMenuProps {
  visible: boolean;
  onClose: () => void;
  onSignInPress: () => void;
  onSubcategorySelect?: (categoryId: string, subcategory: string) => void;
}

const CATEGORY_SUBCATEGORIES: Record<string, { title: string; items: string[] }[]> = {
  deals: [{ title: 'All Deals', items: ['Exclusive Deals', 'Bundles', 'Price Drops'] }],
  apm: [{ title: 'Aldi Price Match', items: ['All Aldi Price Match', 'Fruit & Veg', 'Meat & Fish', 'Pantry Essentials'] }],
  'asian-mart': [{ title: 'Asian Mart', items: ['All Asian Mart', 'Noodles & Rice', 'Sauces & Spices', 'Snacks & Drinks'] }],
  'fruit-veg': [
    { title: 'Fruit & Veg', items: ['Fresh Fruit', 'All Fruit', 'Prepared Fruit', 'Berries & Grapes', 'Exotic & Tropical Fruit', 'Bananas', 'Apples & Pears', 'Citrus'] },
    { title: 'Vegetables', items: ['Fresh Vegetables', 'Potatoes', 'Salads', 'Herbs'] },
  ],
  'eggs-dairy': [{ title: 'Eggs & Dairy', items: ['Milk', 'Eggs', 'Cheese', 'Yogurts', 'Butter & Spreads'] }],
  bakery: [{ title: 'Bakery', items: ['Bread', 'Rolls & Baguettes', 'Cakes & Pastries', 'Breakfast Bakery'] }],
  'meat-fish': [{ title: 'Meat & Fish', items: ['Chicken', 'Beef', 'Pork', 'Fish', 'Vegetarian & Vegan'] }],
  alcohol: [
    { title: 'All Alcohol', items: ['Beer & Cider', 'Lager', 'Large Packs', 'Small Packs', 'Singles', 'All Lager', 'Craft & Ale'] },
    { title: 'Spirits', items: ['Scotch, Bourbon & Whisky', 'Vodka', 'Flavoured Vodka', 'Gin'] },
  ],
  drinks: [{ title: 'Drinks', items: ['Soft Drinks', 'Water', 'Juices', 'Energy Drinks', 'Coffee & Tea'] }],
  snacks: [{ title: 'Snacks', items: ['Crisps', 'Popcorn', 'Nuts', 'Savoury Snacks'] }],
  confectionery: [{ title: 'Confectionery', items: ['Chocolate', 'Sweets', 'Gum & Mints', 'Biscuits'] }],
  'ice-cream': [{ title: 'Ice Cream', items: ['Ice Cream', 'Ice Lollies', 'Frozen Desserts', 'Toppings'] }],
};

export const NavigationMenu: React.FC<NavigationMenuProps> = ({
  visible,
  onClose,
  onSignInPress,
  onSubcategorySelect,
}) => {
  const [selectedCategory, setSelectedCategory] = useState('deals');
  const [mobileSubcategoryOpen, setMobileSubcategoryOpen] = useState(false);
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const handleClose = () => {
    setMobileSubcategoryOpen(false);
    onClose();
  };
  const handleSubcategoryPress = (subcategory: string) => {
    onSubcategorySelect?.(selectedCategory, subcategory);
    handleClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={handleClose}>
      <View style={[styles.overlay, isMobile && styles.overlayMobile]}>
        <TouchableOpacity
          style={[styles.backdrop, isMobile && styles.backdropMobile]}
          onPress={handleClose}
          activeOpacity={1}
        />
        <View style={[styles.drawer, isMobile && styles.drawerMobile]}>
          {isMobile && (
            <View style={styles.mobileDrawerHeader}>
              <Image source={APP_LOGO} style={styles.mobileDrawerLogo} resizeMode="cover" />
              <TouchableOpacity
                onPress={handleClose}
                style={styles.mobileDrawerClose}
                accessibilityLabel="Close navigation menu"
              >
                <Feather name="x" size={32} color="#111111" />
              </TouchableOpacity>
            </View>
          )}
          <View style={styles.drawerBody}>
            <ScrollView
              style={[styles.categoryRail, isMobile && styles.categoryRailMobile]}
              contentContainerStyle={styles.categoryRailContent}
              showsVerticalScrollIndicator
            >
              <TouchableOpacity style={styles.signInButton} onPress={onSignInPress}>
                <Text style={styles.signInText}>SIGN IN / SIGN UP</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.categoryHeading} onPress={() => setSelectedCategory('deals')}>
                <Ionicons name="grid-outline" size={24} color="#111111" />
                <Text style={styles.categoryHeadingText}>SHOP CATEGORIES</Text>
                <Ionicons name="chevron-up" size={21} color="#111111" />
              </TouchableOpacity>

              {GOPUFF_CATEGORIES.map((category) => {
                const selected = category.id === selectedCategory;
                return (
                  <TouchableOpacity
                    key={category.id}
                    onPress={() => {
                      setSelectedCategory(category.id);
                      if (isMobile) {
                        setMobileSubcategoryOpen(true);
                      }
                    }}
                    style={[
                      styles.categoryItem,
                      selected && styles.categoryItemSelected,
                      isMobile && selected && styles.categoryItemMobileSelected,
                    ]}
                  >
                    <Text
                      style={[
                        styles.categoryText,
                        selected && styles.categoryTextSelected,
                        isMobile && selected && styles.categoryTextMobileSelected,
                      ]}
                    >
                      {category.label.replace('\n', ' ')}
                    </Text>
                    <Feather name="chevron-right" size={21} color="#111111" />
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            <View style={[styles.subcategoryPanel, isMobile && styles.subcategoryPanelMobile]}>
              {CATEGORY_SUBCATEGORIES[selectedCategory] ? (
                <View style={styles.columns}>
                  {CATEGORY_SUBCATEGORIES[selectedCategory].map((column) => (
                    <View key={column.title} style={styles.column}>
                      <Text style={styles.columnTitle}>{column.title}</Text>
                      {column.items.map((item) => (
                        <TouchableOpacity
                          key={item}
                          style={[styles.subcategoryItem, item === column.items[0] && styles.subcategorySelected]}
                          onPress={() => handleSubcategoryPress(item)}
                        >
                          <Text style={[styles.subcategoryText, item === column.items[0] && styles.subcategorySelectedText]}>
                            {item}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  ))}
                </View>
              ) : (
                <Text style={styles.emptyPanelText}>More categories coming soon</Text>
              )}
            </View>
          </View>
          {isMobile && mobileSubcategoryOpen && (
            <View style={styles.mobileSubcategoryOverlay}>
              <View style={styles.mobileSubcategoryHeader}>
                <TouchableOpacity
                  onPress={() => setMobileSubcategoryOpen(false)}
                  style={styles.mobileSubcategoryBack}
                  accessibilityLabel="Back to categories"
                >
                  <Feather name="arrow-left" size={26} color="#111111" />
                </TouchableOpacity>
                <Text style={styles.mobileSubcategoryTitle}>
                  {GOPUFF_CATEGORIES.find((category) => category.id === selectedCategory)?.label.replace('\n', ' ')}
                </Text>
                <TouchableOpacity
                  onPress={handleClose}
                  style={styles.mobileDrawerClose}
                  accessibilityLabel="Close navigation menu"
                >
                  <Feather name="x" size={30} color="#111111" />
                </TouchableOpacity>
              </View>
              <ScrollView
                contentContainerStyle={styles.mobileSubcategoryContent}
                showsVerticalScrollIndicator
              >
                {(CATEGORY_SUBCATEGORIES[selectedCategory] || []).map((column) => (
                  <View key={column.title} style={styles.mobileSubcategoryGroup}>
                    <Text style={styles.mobileSubcategoryGroupTitle}>{column.title}</Text>
                    {column.items.map((item) => (
                      <TouchableOpacity
                        key={item}
                        style={styles.mobileSubcategoryItem}
                        onPress={() => handleSubcategoryPress(item)}
                      >
                        <Text style={styles.mobileSubcategoryText}>{item}</Text>
                        <Feather name="chevron-right" size={20} color="#111111" />
                      </TouchableOpacity>
                    ))}
                  </View>
                ))}
              </ScrollView>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    paddingTop: 64,
  },
  overlayMobile: {
    paddingTop: 0,
  },
  backdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 64,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.28)',
  },
  backdropMobile: {
    top: 0,
  },
  drawer: {
    position: 'relative',
    width: '50%',
    minWidth: 0,
    backgroundColor: '#FFFFFF',
    height: '100%',
    shadowColor: '#000000',
    shadowOpacity: 0.2,
    shadowRadius: 14,
    elevation: 12,
  },
  drawerBody: {
    flex: 1,
    flexDirection: 'row',
  },
  drawerMobile: {
    width: '70%',
    minWidth: 0,
  },
  mobileDrawerHeader: {
    height: 88,
    paddingHorizontal: 22,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5E7EB',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mobileDrawerLogo: {
    width: 150,
    height: 48,
  },
  mobileDrawerClose: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mobileSubcategoryOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 88,
    bottom: 0,
    backgroundColor: '#FFFFFF',
    zIndex: 10,
  },
  mobileSubcategoryHeader: {
    height: 64,
    paddingHorizontal: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5E7EB',
    flexDirection: 'row',
    alignItems: 'center',
  },
  mobileSubcategoryBack: {
    width: 42,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mobileSubcategoryTitle: {
    flex: 1,
    marginLeft: 6,
    fontFamily: GOPUFF_FONTS.family,
    fontSize: 20,
    fontWeight: '900',
    fontStyle: 'italic',
    color: '#111111',
  },
  mobileSubcategoryContent: {
    padding: 18,
    paddingBottom: 36,
  },
  mobileSubcategoryGroup: {
    marginBottom: 22,
  },
  mobileSubcategoryGroupTitle: {
    fontFamily: GOPUFF_FONTS.family,
    fontSize: 17,
    fontWeight: '900',
    fontStyle: 'italic',
    color: '#111111',
    marginBottom: 8,
  },
  mobileSubcategoryItem: {
    minHeight: 52,
    paddingHorizontal: 4,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5E7EB',
    flexDirection: 'row',
    alignItems: 'center',
  },
  mobileSubcategoryText: {
    flex: 1,
    fontFamily: GOPUFF_FONTS.family,
    fontSize: 17,
    color: '#4B4B4B',
  },
  categoryRail: {
    width: '50%',
    flex: 1,
    flexBasis: 0,
    borderRightWidth: StyleSheet.hairlineWidth,
    borderRightColor: '#E5E7EB',
  },
  categoryRailMobile: {
    width: '100%',
    flex: 0,
    flexBasis: 'auto',
    paddingHorizontal: 10,
    borderRightWidth: 0,
  },
  categoryRailContent: {
    padding: 18,
    paddingBottom: 32,
  },
  signInButton: {
    height: 52,
    borderRadius: 30,
    backgroundColor: '#8000FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  signInText: {
    fontFamily: GOPUFF_FONTS.family,
    fontSize: 16,
    fontWeight: '900',
    fontStyle: 'italic',
    color: '#FFFFFF',
  },
  categoryHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  categoryHeadingText: {
    flex: 1,
    fontFamily: GOPUFF_FONTS.family,
    fontSize: 17,
    fontWeight: '900',
    fontStyle: 'italic',
    color: '#111111',
  },
  categoryItem: {
    minHeight: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 38,
    borderRadius: 5,
  },
  categoryItemSelected: {
    backgroundColor: '#8000FF',
    borderWidth: 2,
    borderColor: '#111111',
  },
  categoryItemMobileSelected: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  categoryText: {
    flex: 1,
    fontFamily: GOPUFF_FONTS.family,
    fontSize: 18,
    color: '#4B4B4B',
  },
  categoryTextSelected: {
    color: '#111111',
  },
  categoryTextMobileSelected: {
    color: '#4B4B4B',
  },
  subcategoryPanel: {
    flex: 1,
    flexBasis: 0,
    width: '50%',
    padding: 34,
  },
  subcategoryPanelMobile: {
    display: 'none',
  },
  columns: {
    flexDirection: 'row',
    gap: 34,
  },
  column: {
    flex: 1,
  },
  columnTitle: {
    fontFamily: GOPUFF_FONTS.family,
    fontSize: 18,
    fontWeight: '700',
    color: '#4B4B4B',
    marginBottom: 20,
  },
  subcategoryItem: {
    minHeight: 52,
    justifyContent: 'center',
    paddingHorizontal: 18,
    borderRadius: 5,
  },
  subcategorySelected: {
    backgroundColor: '#8000FF',
  },
  subcategoryText: {
    fontFamily: GOPUFF_FONTS.family,
    fontSize: 17,
    color: '#777777',
  },
  subcategorySelectedText: {
    textDecorationLine: 'underline',
  },
  emptyPanelText: {
    fontFamily: GOPUFF_FONTS.family,
    fontSize: 18,
    color: '#777777',
  },
});
