import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Platform,
  SafeAreaView,
  StatusBar,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { GOPUFF_COLORS, GOPUFF_FONTS } from '../constants/theme';
import { Product } from '../data/products';
import { ProductCard } from './ProductCard';

const CUSTOM_ICONS = {
  menu: require('../../assets/icons/menu-burger (1).svg'),
  user: require('../../assets/icons/circle-user (3).svg'),
  search: require('../../assets/icons/search (4).svg'),
  shoppingBag: require('../../assets/icons/shopping-bag (3).svg'),
};

interface TopNavProps {
  onMenuPress?: () => void;
  onSearchChange?: (text: string) => void;
  onSearchSubmit?: (query?: string) => void;
  onSignInPress?: () => void;
  onCartPress?: () => void;
  cartCount?: number;
  onLogoPress?: () => void;
  searchProducts?: Product[];
  onSearchProductPress?: (product: Product) => void;
  locationName?: string;
  deliveryMinutes?: string;
  onLocationPress?: () => void;
  isAuthenticated?: boolean;
  accountName?: string;
}

export const TopNav: React.FC<TopNavProps> = ({
  onMenuPress,
  onSearchChange,
  onSearchSubmit,
  onSignInPress,
  onCartPress,
  cartCount = 0,
  onLogoPress,
  searchProducts = [],
  onSearchProductPress,
  locationName = 'SUSSEX',
  deliveryMinutes = '12 MINS',
  onLocationPress,
  isAuthenticated = false,
  accountName,
}) => {
  const [searchValue, setSearchValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const searchInputRef = useRef<TextInput>(null);
  const { width } = useWindowDimensions();
  const viewportWidth =
    Platform.OS === 'web' && typeof window !== 'undefined' ? window.innerWidth : width;
  const isMobile = viewportWidth < 768;
  const popularSearches = ['milk', 'bread', 'crisps'];
  const normalizedSearch = searchValue.trim().toLowerCase();
  const visibleProducts = (normalizedSearch
    ? searchProducts.filter((product) =>
        product.name.replace(/\n/g, ' ').toLowerCase().includes(normalizedSearch),
      )
    : searchProducts
  ).slice(0, 10);

  const handleSearchTextChange = (text: string) => {
    setSearchValue(text);
    if (onSearchChange) {
      onSearchChange(text);
    }
  };

  const openSearch = () => {
    setIsFocused(true);
    setTimeout(() => searchInputRef.current?.focus(), 0);
  };

  const handleSearchProductPress = (product: Product) => {
    setIsFocused(false);
    searchInputRef.current?.blur();
    onSearchProductPress?.(product);
  };

  const handlePopularSearchPress = (search: string) => {
    setSearchValue(search);
    setIsFocused(false);
    searchInputRef.current?.blur();
    onSearchChange?.(search);
    onSearchSubmit?.(search);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <View style={[styles.container, isMobile && styles.containerMobile]}>
        {/* Left Section: Hamburger Menu + Logo */}
        <View
          pointerEvents="box-none"
          style={[
            styles.leftGroup,
            isMobile && styles.leftGroupMobile,
            isMobile && isFocused && styles.leftGroupMobileFocused,
          ]}
        >
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onMenuPress}
            style={[styles.menuButton, isMobile && styles.menuButtonMobile]}
            accessibilityLabel="Open navigation menu"
          >
            <Image source={CUSTOM_ICONS.menu} style={styles.menuIcon} />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.logoContainer, isMobile && styles.logoContainerMobile]}
            onPress={onLogoPress}
            accessibilityLabel="Go to home"
          >
            <Text style={styles.logoText}>gopuff</Text>
          </TouchableOpacity>
        </View>

        {/* Center Section: Search Bar (Pill shaped) */}
        <View
          style={[
            styles.searchBarWrapper,
            isMobile && styles.searchBarMobile,
            isMobile && isFocused && styles.searchBarMobileFocused,
            isMobile && isFocused && {
              width: Math.max(viewportWidth - 104, 220),
              maxWidth: Math.max(viewportWidth - 104, 220),
              minWidth: Math.max(viewportWidth - 104, 220),
            },
            isFocused && styles.searchBarFocused,
          ]}
          onTouchStart={() => {
            if (!(isMobile && isFocused)) {
              openSearch();
            }
          }}
        >
        <TouchableOpacity
          onPress={() => {
            openSearch();
          }}
          accessibilityLabel="Open search"
        >
          {isMobile && isFocused ? (
            <TouchableOpacity
              onPress={() => {
                setIsFocused(false);
                searchInputRef.current?.blur();
              }}
              style={styles.mobileSearchBackButton}
              accessibilityLabel="Close search"
            >
              <Ionicons name="arrow-back" size={26} color="#253746" />
            </TouchableOpacity>
          ) : (
            <Image
              source={CUSTOM_ICONS.search}
              style={[styles.searchIcon, isMobile && styles.mobileSearchIcon]}
            />
          )}
        </TouchableOpacity>
        <TextInput
          ref={searchInputRef}
          style={[
            styles.searchInput,
            isMobile && styles.searchInputMobile,
            isMobile && isFocused && styles.searchInputMobileFocused,
          ]}
            placeholder="Search Gopuff"
            placeholderTextColor={GOPUFF_COLORS.placeholder}
            value={searchValue}
            onChangeText={handleSearchTextChange}
            onSubmitEditing={() => {
              setIsFocused(false);
              searchInputRef.current?.blur();
              onSearchSubmit?.(searchValue);
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => {
              if (!isMobile) {
                setTimeout(() => setIsFocused(false), 150);
              }
            }}
            returnKeyType="search"
            autoCapitalize="none"
            autoCorrect={false}
          />
          {searchValue.length > 0 && (
            <TouchableOpacity
              onPress={() => handleSearchTextChange('')}
              style={styles.clearButton}
            >
              <Ionicons
                name="close-circle"
                size={16}
                color={GOPUFF_COLORS.placeholder}
              />
            </TouchableOpacity>
          )}
        </View>

        {/* Right Section: Sign In button + Cart button */}
        <View style={[styles.rightGroup, isMobile && styles.rightGroupMobile]}>
          {/* SIGN IN Pill Button */}
          <TouchableOpacity
            activeOpacity={0.75}
            onPress={onSignInPress}
            style={[styles.signInButton, isMobile && styles.signInButtonMobile]}
            accessibilityLabel={isAuthenticated ? 'Open account' : 'Sign in'}
          >
            <Image source={CUSTOM_ICONS.user} style={styles.signInIcon} />
            {!isMobile && (
              <Text style={styles.signInText}>
                {isAuthenticated ? (accountName || 'ACCOUNT').toUpperCase() : 'SIGN IN'}
              </Text>
            )}
          </TouchableOpacity>

          {/* Cart Pill Button */}
          <TouchableOpacity
            activeOpacity={0.75}
            onPress={onCartPress}
            style={[styles.cartButton, isMobile && styles.cartButtonMobile]}
            accessibilityLabel="Shopping cart"
          >
            <Image source={CUSTOM_ICONS.shoppingBag} style={styles.cartIcon} />
            {(!isMobile || cartCount > 0) && (
              <Text style={[styles.cartText, isMobile && styles.cartTextMobile]}>
                {cartCount}
              </Text>
            )}
          </TouchableOpacity>
        </View>
        {isMobile && (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onLocationPress}
            accessibilityLabel="Choose delivery location"
            style={[styles.mobileDeliveryRow, isFocused && styles.mobileDeliveryRowFocused]}
          >
            <Text style={styles.mobileDeliveryLabel}>ARRIVES IN</Text>
            <Text style={styles.mobileDeliveryTime}>{deliveryMinutes}</Text>
            <Text style={styles.mobileDeliveryDot}>•</Text>
            <Text style={styles.mobileDeliveryLocation}>{locationName}</Text>
            <Feather name="chevron-down" size={16} color="#555555" />
          </TouchableOpacity>
        )}
        {isFocused && (
          <View style={[styles.searchPanel, isMobile && styles.searchPanelMobile]}>
            <ScrollView
              style={styles.searchPanelScroll}
              contentContainerStyle={styles.searchPanelContent}
              keyboardShouldPersistTaps="handled"
            >
              <Text style={styles.searchPanelHeading}>
                {normalizedSearch ? 'SEARCH RESULTS' : 'POPULAR SEARCHES'}
              </Text>
              {!normalizedSearch &&
                popularSearches.map((search) => (
                  <TouchableOpacity
                    key={search}
                    style={styles.popularSearchRow}
                    onPress={() => handlePopularSearchPress(search)}
                  >
                    <Image source={CUSTOM_ICONS.search} style={styles.popularSearchIcon} />
                    <Text style={styles.popularSearchText}>{search}</Text>
                  </TouchableOpacity>
                ))}
              {normalizedSearch && visibleProducts.length === 0 && (
                <Text style={styles.emptySearchText}>No products found.</Text>
              )}
              {visibleProducts.length > 0 && (
                <View style={styles.searchProductsSection}>
                  <View style={styles.searchProductsHeader}>
                    <Text style={styles.searchPanelHeading}>POPULAR ITEMS.</Text>
                    <Text style={styles.searchMoreText}>MORE ITEMS</Text>
                  </View>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.searchProductsRow}
                    keyboardShouldPersistTaps="handled"
                  >
                    {visibleProducts.map((product) => (
                      <View key={product.id} style={styles.searchProductCard}>
                        <ProductCard
                          product={product}
                          onPress={handleSearchProductPress}
                        />
                      </View>
                    ))}
                  </ScrollView>
                </View>
              )}
            </ScrollView>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: GOPUFF_COLORS.white,
    ...Platform.select({
      web: {
        position: 'relative' as any,
        zIndex: 1000,
      } as any,
    }),
  },
  container: {
    position: 'relative',
    height: 64,
    backgroundColor: GOPUFF_COLORS.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: GOPUFF_COLORS.borderLight,
    ...Platform.select({
      web: {
        position: 'sticky' as any,
        top: 0,
        zIndex: 100,
      },
    }),
  },
  containerMobile: {
    height: 104,
    paddingHorizontal: 22,
    justifyContent: 'flex-start',
  },
  mobileDeliveryRow: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 8,
    height: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  mobileDeliveryRowFocused: {
    display: 'none',
  },
  mobileDeliveryLabel: {
    fontFamily: GOPUFF_FONTS.family,
    fontSize: 13,
    fontWeight: '900',
    fontStyle: 'italic',
    color: '#555555',
  },
  mobileDeliveryTime: {
    fontFamily: GOPUFF_FONTS.family,
    fontSize: 14,
    fontWeight: '900',
    fontStyle: 'italic',
    color: '#1010F5',
  },
  mobileDeliveryDot: {
    fontFamily: GOPUFF_FONTS.family,
    fontSize: 15,
    color: '#555555',
  },
  mobileDeliveryLocation: {
    fontFamily: GOPUFF_FONTS.family,
    fontSize: 14,
    fontWeight: '900',
    fontStyle: 'italic',
    color: '#555555',
  },
  searchPanel: {
    position: 'absolute',
    top: 64,
    left: 0,
    right: 0,
    height: 'calc(100vh - 64px)' as any,
    backgroundColor: '#FFFFFF',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#E5E7EB',
    zIndex: 1000,
    ...Platform.select({
      web: {
        position: 'fixed' as any,
        top: 64,
        left: 0,
        width: '100vw',
        zIndex: 1000,
        overflow: 'hidden',
        boxShadow: '0 8px 18px rgba(15, 23, 42, 0.12)',
      } as any,
    }),
  },
  searchPanelMobile: {
    height: 'calc(100vh - 64px)' as any,
    maxHeight: undefined,
  },
  searchPanelScroll: {
    flex: 1,
    minHeight: 0,
  },
  searchPanelContent: {
    paddingHorizontal: 32,
    paddingTop: 24,
    paddingBottom: 40,
  },
  searchPanelHeading: {
    fontFamily: GOPUFF_FONTS.family,
    fontSize: 20,
    fontWeight: '900',
    fontStyle: 'italic',
    color: '#111827',
    marginBottom: 14,
  },
  popularSearchRow: {
    height: 58,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5E7EB',
    flexDirection: 'row',
    alignItems: 'center',
  },
  popularSearchIcon: {
    width: 25,
    height: 25,
    marginHorizontal: 14,
    opacity: 0.75,
  },
  popularSearchText: {
    fontFamily: GOPUFF_FONTS.family,
    fontSize: 20,
    fontWeight: '700',
    color: '#374151',
  },
  emptySearchText: {
    fontFamily: GOPUFF_FONTS.family,
    fontSize: 16,
    color: '#6B7280',
    paddingVertical: 24,
  },
  searchProductsSection: {
    marginTop: 26,
  },
  searchProductsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  searchProductsRow: {
    gap: 18,
    paddingTop: 10,
    paddingBottom: 12,
    paddingRight: 28,
  },
  searchProductCard: {
    width: 160,
  },
  searchMoreText: {
    fontFamily: GOPUFF_FONTS.family,
    fontSize: 15,
    fontWeight: '800',
    fontStyle: 'italic',
    color: '#6B7280',
  },
  leftGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftGroupMobile: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 64,
    width: '100%',
    justifyContent: 'center',
    zIndex: 3,
  },
  leftGroupMobileFocused: {
    display: 'none',
  },
  menuButtonMobile: {
    position: 'absolute',
    left: 16,
    top: 12,
    marginRight: 0,
  },
  menuButton: {
    padding: 6,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuIcon: {
    width: 26,
    height: 26,
  },
  logoContainer: {
    marginRight: 20,
  },
  logoContainerMobile: {
    position: 'absolute',
    left: '50%',
    width: 76,
    marginLeft: -38,
    marginRight: 0,
    alignItems: 'center',
  },
  logoText: {
    fontFamily: GOPUFF_FONTS.family,
    fontSize: 26,
    fontWeight: '900', // Black
    color: GOPUFF_COLORS.primary,
    letterSpacing: -0.8,
    ...Platform.select({
      web: {
        userSelect: 'none' as any,
      },
    }),
  },
  searchBarWrapper: {
    flex: 1,
    minWidth: 0,
    maxWidth: 460,
    height: 40,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: GOPUFF_COLORS.border,
    backgroundColor: GOPUFF_COLORS.white,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    marginHorizontal: 12,
    zIndex: 2,
  },
  searchBarMobile: {
    flex: 0,
    position: 'absolute',
    right: 54,
    top: 15,
    width: 42,
    minWidth: 42,
    maxWidth: 42,
    height: 40,
    marginHorizontal: 0,
    paddingHorizontal: 8,
    borderWidth: 0,
  },
  searchBarMobileFocused: {
    flex: 1,
    left: 8,
    right: 54,
    top: 10,
    width: 'auto',
    maxWidth: undefined,
    minWidth: 120,
    height: 44,
    borderWidth: 1.5,
    borderColor: '#149BFF',
    borderRadius: 9999,
    paddingHorizontal: 12,
    backgroundColor: GOPUFF_COLORS.white,
  },
  mobileSearchBackButton: {
    width: 34,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  searchBarFocused: {
    borderColor: GOPUFF_COLORS.primary,
  },
  searchIcon: {
    width: 18,
    height: 18,
    marginRight: 8,
    opacity: 0.55,
  },
  mobileSearchIcon: {
    tintColor: GOPUFF_COLORS.black,
    opacity: 1,
  },
  searchInput: {
    fontFamily: GOPUFF_FONTS.family,
    fontWeight: '400', // Regular
    flex: 1,
    height: '100%',
    fontSize: 14,
    color: GOPUFF_COLORS.black,
    paddingVertical: 0,
    ...Platform.select({
      web: {
        outlineStyle: 'none' as any,
      },
    }),
  },
  searchInputMobile: {
    display: 'none',
  },
  searchInputMobileFocused: {
    display: 'flex',
    fontSize: 18,
    color: '#111827',
  },
  clearButton: {
    padding: 2,
    marginLeft: 4,
  },
  rightGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flexShrink: 1,
    zIndex: 1,
  },
  rightGroupMobile: {
    position: 'absolute',
    right: 10,
    top: 15,
    gap: 0,
    flexShrink: 0,
    zIndex: 3,
  },
  signInButton: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    paddingHorizontal: 12,
    borderRadius: 9999,
    borderWidth: 1.5,
    borderColor: GOPUFF_COLORS.borderDark,
    backgroundColor: GOPUFF_COLORS.white,
  },
  signInButtonMobile: {
    display: 'none',
  },
  cartButtonMobile: {
    position: 'relative',
    paddingHorizontal: 4,
    borderWidth: 0,
    height: 40,
  },
  signInIcon: {
    width: 22,
    height: 22,
    marginRight: 7,
  },
  signInText: {
    fontFamily: GOPUFF_FONTS.family,
    fontSize: 13,
    fontWeight: '800', // Bold
    color: GOPUFF_COLORS.borderDark,
    letterSpacing: 0.5,
  },
  cartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    paddingHorizontal: 12,
    borderRadius: 9999,
    borderWidth: 1.5,
    borderColor: GOPUFF_COLORS.borderDark,
    backgroundColor: GOPUFF_COLORS.white,
  },
  cartIcon: {
    width: 18,
    height: 18,
    marginRight: 7,
  },
  cartText: {
    fontFamily: GOPUFF_FONTS.family,
    fontSize: 14,
    fontWeight: '800', // Bold
    color: GOPUFF_COLORS.borderDark,
  },
  cartTextMobile: {
    position: 'absolute',
    top: -8,
    right: -9,
    minWidth: 28,
    height: 28,
    paddingHorizontal: 0,
    borderRadius: 9999,
    backgroundColor: GOPUFF_COLORS.primary,
    color: GOPUFF_COLORS.white,
    fontSize: 14,
    fontWeight: '900',
    lineHeight: 28,
    textAlign: 'center',
  },
});
