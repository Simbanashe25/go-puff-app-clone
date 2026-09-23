import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Alert,
  Platform,
  ScrollView,
  ActivityIndicator,
  useWindowDimensions,
} from 'react-native';
import { useFonts } from 'expo-font';
import { TopNav } from './src/components/TopNav';
import { CategoriesSection } from './src/components/CategoriesSection';
import { HeroBannersSection } from './src/components/HeroBannersSection';
import { ProductsSection } from './src/components/ProductsSection';
import { ProductDetailsScreen } from './src/components/ProductDetailsScreen';
import { NavigationMenu } from './src/components/NavigationMenu';
import { CategoryItem, GOPUFF_CATEGORIES } from './src/data/categories';
import {
  CATEGORY_PRODUCTS,
  EXCLUSIVE_DEALS_PRODUCTS,
  Product,
} from './src/data/products';
import { GOPUFF_FONTS, GOPUFF_SIZES } from './src/constants/theme';
import { GINTO_FONT_CSS } from './src/constants/gintoFontFace';
import { SiteFooter } from './src/components/SiteFooter';
import { BagItem, BagScreen } from './src/components/BagScreen';
import { AuthModal } from './src/components/AuthModal';
import { CategoryScreen } from './src/components/CategoryScreen';
import { LocationModal, SavedLocation } from './src/components/LocationModal';
import { SearchResultsScreen } from './src/components/SearchResultsScreen';
import { CheckoutScreen } from './src/components/CheckoutScreen';
import { OrderConfirmationScreen } from './src/components/OrderConfirmationScreen';
import { OrderTrackingScreen } from './src/components/OrderTrackingScreen';
import { AccountScreen } from './src/components/AccountScreen';
import { SupportScreen } from './src/components/SupportScreen';
import { LegalScreen } from './src/components/LegalScreen';
import { MobileBottomNav } from './src/components/MobileBottomNav';
import { LoadingSkeleton } from './src/components/LoadingSkeleton';

export default function App() {
  const { width } = useWindowDimensions();
  const [cartItems, setCartItems] = useState<Record<string, BagItem>>({});
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('deals');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | undefined>();
  const [currentLocation, setCurrentLocation] = useState('SUSSEX');
  const [savedLocation, setSavedLocation] = useState<SavedLocation>({
    id: 'sussex',
    name: 'Sussex',
    address: 'Sussex, England',
    delivery: 'Est delivery - 12 mins · Open 24 hrs',
  });
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBagOpen, setIsBagOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrderConfirmationOpen, setIsOrderConfirmationOpen] = useState(false);
  const [isOrderTrackingOpen, setIsOrderTrackingOpen] = useState(false);
  const [page, setPage] = useState<'account' | 'support' | 'legal' | null>(null);
  const [legalTitle, setLegalTitle] = useState('');
  const [completedOrder, setCompletedOrder] = useState<{ items: BagItem[]; total: number; orderNumber: string } | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authProfile, setAuthProfile] = useState<{ name: string; email: string } | null>(null);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchResultsOpen, setIsSearchResultsOpen] = useState(false);
  const [focusSearchRequest, setFocusSearchRequest] = useState(0);
  const cartCount = Object.values(cartItems).reduce((total, item) => total + item.quantity, 0);

  // Load native fonts for Expo mobile
  const [fontsLoaded, fontsError] = useFonts({
    'ABCGintoNormal-Regular': require('./assets/fonts/ABCGintoNormal-Regular.otf'),
    'ABCGintoNormal-Medium': require('./assets/fonts/ABCGintoNormal-Medium.otf'),
    'ABCGintoNormal-Bold': require('./assets/fonts/ABCGintoNormal-Bold.otf'),
    'ABCGintoNormal-Black': require('./assets/fonts/ABCGintoNormal-Black.otf'),
  });

  // Inject ABC Ginto font family and @font-face rules on Web
  useEffect(() => {
    if (Platform.OS === 'web' && typeof document !== 'undefined') {
      const styleId = 'abc-ginto-font-styles';
      let styleTag = document.getElementById(styleId) as HTMLStyleElement | null;
      if (!styleTag) {
        styleTag = document.createElement('style');
        styleTag.id = styleId;
        styleTag.textContent = GINTO_FONT_CSS;
        document.head.appendChild(styleTag);
      }
    }
  }, []);

  if (fontsError) {
    console.error('Failed to load app fonts.', fontsError);
  }

  // Web fonts are injected independently above, so native font loading must
  // not block the web shell from mounting.
  if (Platform.OS !== 'web' && !fontsLoaded && !fontsError) {
    return (
      <View style={styles.fontLoadingScreen}>
        <LoadingSkeleton style={styles.loadingLogoSkeleton} />
        <LoadingSkeleton style={styles.loadingContentSkeleton} />
        <LoadingSkeleton style={styles.loadingContentSkeleton} />
        <ActivityIndicator size="small" color="#8000FF" />
      </View>
    );
  }

  const handleMenuPress = () => {
    setIsMenuOpen(true);
  };

  const handleSignInPress = () => {
    setIsMenuOpen(false);
    if (authProfile) {
      setPage('account');
    } else {
      setIsAuthOpen(true);
    }
  };

  const handleCartPress = () => {
    setSelectedProduct(null);
    setIsCheckoutOpen(false);
    setIsBagOpen(true);
  };

  const handleCheckout = () => {
    if (Object.keys(cartItems).length === 0) return;
    setIsBagOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderComplete = () => {
    const items = Object.values(cartItems);
    const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const delivery = subtotal >= 30 ? 0 : 2.99;
    setCompletedOrder({
      items,
      total: subtotal + delivery,
      orderNumber: `GP-${Date.now().toString().slice(-8)}`,
    });
    setCartItems({});
    setIsCheckoutOpen(false);
    setIsOrderConfirmationOpen(true);
  };

  const handleCategorySelect = (category: CategoryItem) => {
    setIsBagOpen(false);
    setSelectedProduct(null);
    setSelectedCategoryId(category.id);
    setSelectedSubcategory(undefined);
  };

  const handleSubcategorySelect = (categoryId: string, subcategory: string) => {
    setIsBagOpen(false);
    setSelectedProduct(null);
    setSelectedCategoryId(categoryId);
    setSelectedSubcategory(subcategory);
  };

  const handleLocationPress = () => {
    setIsLocationOpen(true);
  };

  const handleLocationSelect = (location: SavedLocation) => {
    setSavedLocation(location);
    setCurrentLocation(location.name.toUpperCase());
  };

  const handleBannerPress = (bannerId: string) => {
    if (Platform.OS === 'web') {
      window.alert(`Opened banner promotion: ${bannerId}`);
    } else {
      Alert.alert('Promotion', `Opened banner: ${bannerId}`);
    }
  };

  const handleAddToCart = (product: Product) => {
    setCartItems((previous) => ({
      ...previous,
      [product.id]: {
        product,
        quantity: (previous[product.id]?.quantity || 0) + 1,
      },
    }));
  };

  const handleRemoveFromCart = (product: Product) => {
    setCartItems((previous) => {
      const current = previous[product.id];
      if (!current || current.quantity <= 1) {
        const next = { ...previous };
        delete next[product.id];
        return next;
      }
      return {
        ...previous,
        [product.id]: { ...current, quantity: current.quantity - 1 },
      };
    });
  };

  const handleProductPress = (product: Product) => {
    setIsBagOpen(false);
    setIsSearchResultsOpen(false);
    setSelectedProduct(product);
  };

  const handleSearchSubmit = (submittedQuery?: string) => {
    const query = (submittedQuery ?? searchQuery).trim();
    if (!query) return;
    setSearchQuery(query);
    setIsBagOpen(false);
    setSelectedProduct(null);
    setIsSearchResultsOpen(true);
  };

  const searchProducts = Array.from(
    new Map(
      [...EXCLUSIVE_DEALS_PRODUCTS, ...CATEGORY_PRODUCTS].map((product) => [
        product.id,
        product,
      ]),
    ).values(),
  );

  const handleSeeAll = () => {
    if (Platform.OS === 'web') {
      window.alert('Viewing all deals & bundles');
    } else {
      Alert.alert('See All', 'Viewing all deals & bundles');
    }
  };

  return (
    <>
    {page === 'account' ? (
      <AccountScreen
        signedIn={Boolean(authProfile)}
        profile={authProfile}
        onBack={() => setPage(null)}
        onSignIn={handleSignInPress}
        onSignOut={() => setAuthProfile(null)}
      />
    ) : page === 'support' ? (
      <SupportScreen onBack={() => setPage(null)} />
    ) : page === 'legal' ? (
      <LegalScreen title={legalTitle} onBack={() => setPage(null)} />
    ) : isOrderTrackingOpen && completedOrder ? (
      <OrderTrackingScreen
        orderNumber={completedOrder.orderNumber}
        locationName={currentLocation}
        onBack={() => setIsOrderTrackingOpen(false)}
        onSupport={() => {
          if (Platform.OS === 'web') {
            window.alert('Support is ready to help with your order.');
          } else {
            Alert.alert('Support', 'Support is ready to help with your order.');
          }
        }}
      />
    ) : isOrderConfirmationOpen && completedOrder ? (
      <OrderConfirmationScreen
        items={completedOrder.items}
        total={completedOrder.total}
        orderNumber={completedOrder.orderNumber}
        locationName={currentLocation}
        onTrack={() => setIsOrderTrackingOpen(true)}
        onContinue={() => {
          setIsOrderConfirmationOpen(false);
          setSelectedProduct(null);
          setSelectedCategoryId('deals');
        }}
      />
    ) : isCheckoutOpen ? (
      <CheckoutScreen
        items={Object.values(cartItems)}
        cartCount={cartCount}
        isAuthenticated={Boolean(authProfile)}
        accountName={authProfile?.name}
        locationName={currentLocation}
        onLocationPress={handleLocationPress}
        onMenuPress={handleMenuPress}
        onSignInPress={handleSignInPress}
        onCartPress={handleCartPress}
        onLogoPress={() => {
          setIsCheckoutOpen(false);
          setIsBagOpen(false);
        }}
        searchProducts={searchProducts}
        onSearchProductPress={handleProductPress}
        onSearchChange={setSearchQuery}
        onSearchSubmit={handleSearchSubmit}
        focusSearchRequest={focusSearchRequest}
        onBack={() => {
          setIsCheckoutOpen(false);
          setIsBagOpen(true);
        }}
        onComplete={handleOrderComplete}
      />
    ) : isBagOpen ? (
      <View style={styles.pageContainer}>
        <TopNav
          cartCount={cartCount}
          isAuthenticated={Boolean(authProfile)}
          accountName={authProfile?.name}
          locationName={currentLocation}
          onLocationPress={handleLocationPress}
          onMenuPress={handleMenuPress}
          onSignInPress={handleSignInPress}
          onCartPress={handleCartPress}
          onLogoPress={() => setIsBagOpen(false)}
          searchProducts={searchProducts}
          onSearchProductPress={handleProductPress}
          onSearchChange={setSearchQuery}
          onSearchSubmit={handleSearchSubmit}
          focusSearchRequest={focusSearchRequest}
        />
        <BagScreen
          items={Object.values(cartItems)}
          recommendations={CATEGORY_PRODUCTS.slice(0, 8)}
          onBack={() => setIsBagOpen(false)}
          onProductPress={handleProductPress}
          onAdd={handleAddToCart}
          onRemove={handleRemoveFromCart}
          onCheckout={handleCheckout}
        />
      </View>
    ) : isSearchResultsOpen ? (
      <View style={styles.pageContainer}>
        <TopNav
          cartCount={cartCount}
          isAuthenticated={Boolean(authProfile)}
          accountName={authProfile?.name}
          locationName={currentLocation}
          onLocationPress={handleLocationPress}
          onMenuPress={handleMenuPress}
          onSignInPress={handleSignInPress}
          onCartPress={handleCartPress}
          onLogoPress={() => setIsSearchResultsOpen(false)}
          searchProducts={searchProducts}
          onSearchProductPress={handleProductPress}
          onSearchChange={setSearchQuery}
          onSearchSubmit={handleSearchSubmit}
          focusSearchRequest={focusSearchRequest}
        />
        <SearchResultsScreen
          key={`search-${searchQuery}`}
          query={searchQuery}
          products={searchProducts}
          onProductPress={handleProductPress}
          onAddToCart={handleAddToCart}
          onBack={() => setIsSearchResultsOpen(false)}
        />
      </View>
    ) : selectedCategoryId !== 'deals' || selectedSubcategory ? (
      <View style={styles.pageContainer}>
        <TopNav
          cartCount={cartCount}
          isAuthenticated={Boolean(authProfile)}
          accountName={authProfile?.name}
          locationName={currentLocation}
          onLocationPress={handleLocationPress}
          onMenuPress={handleMenuPress}
          onSignInPress={handleSignInPress}
          onCartPress={handleCartPress}
          onLogoPress={() => setSelectedCategoryId('deals')}
          searchProducts={searchProducts}
          onSearchProductPress={handleProductPress}
          onSearchChange={setSearchQuery}
          onSearchSubmit={handleSearchSubmit}
          focusSearchRequest={focusSearchRequest}
        />
        <CategoryScreen
          key={selectedCategoryId}
          category={
            GOPUFF_CATEGORIES.find((category) => category.id === selectedCategoryId) ||
            GOPUFF_CATEGORIES[0]
          }
          initialSubcategory={selectedSubcategory}
          products={[...EXCLUSIVE_DEALS_PRODUCTS, ...CATEGORY_PRODUCTS]}
          onCategorySelect={handleCategorySelect}
          onProductPress={handleProductPress}
          onAddToCart={handleAddToCart}
          onBack={() => setSelectedCategoryId('deals')}
        />
      </View>
    ) : selectedProduct ? (
      <ProductDetailsScreen
        key={selectedProduct.id}
        product={selectedProduct}
        locationName={currentLocation}
        onLocationPress={handleLocationPress}
        similarProducts={CATEGORY_PRODUCTS.filter(
          (product) => product.id !== selectedProduct.id,
        ).slice(0, 8)}
        onBack={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onRemoveFromCart={handleRemoveFromCart}
        onProductPress={handleProductPress}
        cartCount={cartCount}
        onMenuPress={handleMenuPress}
        onSignInPress={handleSignInPress}
        onCartPress={handleCartPress}
        onCheckoutPress={handleCheckout}
        onLogoPress={() => setSelectedProduct(null)}
        searchProducts={searchProducts}
        onSearchProductPress={handleProductPress}
      />
    ) : (
    <View style={styles.container}>
      {/* 1. Top Navigation Bar (Hamburger, Logo, Search, Sign In, Cart) */}
      <TopNav
        cartCount={cartCount}
        isAuthenticated={Boolean(authProfile)}
        accountName={authProfile?.name}
        locationName={currentLocation}
        onLocationPress={handleLocationPress}
        onMenuPress={handleMenuPress}
        onSignInPress={handleSignInPress}
        onCartPress={handleCartPress}
        onLogoPress={() => setSelectedProduct(null)}
        searchProducts={searchProducts}
        onSearchProductPress={handleProductPress}
        onSearchChange={setSearchQuery}
        onSearchSubmit={handleSearchSubmit}
      />

      <ScrollView
        style={styles.mainScroll}
        contentContainerStyle={[
          styles.scrollContent,
          width < GOPUFF_SIZES.desktopBreakpoint && styles.scrollContentMobile,
        ]}
      >
        {/* 2. Categories Sub-bar & Horizontal 12-badge strip */}
        <CategoriesSection
          selectedCategoryId={selectedCategoryId}
          onSelectCategory={handleCategorySelect}
          locationName={currentLocation}
          onLocationPress={handleLocationPress}
          onAddToCart={handleAddToCart}
          onProductPress={handleProductPress}
          onBannerPress={handleBannerPress}
          onStayTunedPress={() => {
            if (Platform.OS === 'web') {
              window.alert('Stay tuned for special local drops in ' + currentLocation);
            }
          }}
        />

        {/* 3. Hero Banners Section (Featured Card, Slider with Dots, 2 Sub-cards) */}
        <HeroBannersSection onBannerPress={handleBannerPress} />

        {/* 4. Products Horizontal Carousel Section matching user screenshot */}
        <ProductsSection
          title="EXCLUSIVE DISCOUNTS & DEALS"
          subtitle="Hand-picked bundles and savings delivered in minutes"
          products={EXCLUSIVE_DEALS_PRODUCTS}
          onAddToCart={handleAddToCart}
          onRemoveFromCart={handleRemoveFromCart}
          onProductPress={handleProductPress}
          onSeeAllPress={handleSeeAll}
          itemCount={EXCLUSIVE_DEALS_PRODUCTS.length}
        />

        {GOPUFF_CATEGORIES.filter((category) => category.id !== 'deals').map(
          (category) => {
            const categoryProducts = CATEGORY_PRODUCTS.filter(
              (product) => product.categoryId === category.id,
            );

            return (
              <ProductsSection
                key={category.id}
                title={category.label.replace('\n', ' ')}
                subtitle={`Popular ${category.label.replace('\n', ' ').toLowerCase()} products`}
                products={categoryProducts}
                onAddToCart={handleAddToCart}
                onRemoveFromCart={handleRemoveFromCart}
                onProductPress={handleProductPress}
                onSeeAllPress={handleSeeAll}
                itemCount={categoryProducts.length}
              />
            );
          },
        )}

        <SiteFooter
          locationName={currentLocation}
          onSignInPress={handleSignInPress}
          onAccountPress={() => setPage('account')}
          onSupportPress={() => setPage('support')}
          onLegalPress={(title) => {
            setLegalTitle(title);
            setPage('legal');
          }}
        />
      </ScrollView>
    </View>
    )}
    {!isCheckoutOpen && (
      <MobileBottomNav
        active={page === 'account' ? 'account' : isBagOpen ? 'bag' : isSearchResultsOpen ? 'search' : selectedCategoryId !== 'deals' ? 'categories' : 'home'}
        cartCount={cartCount}
        onHome={() => {
          setPage(null);
          setIsBagOpen(false);
          setIsSearchResultsOpen(false);
          setSelectedProduct(null);
          setSelectedCategoryId('deals');
          setSelectedSubcategory(undefined);
        }}
        onCategories={() => {
          setPage(null);
          setIsBagOpen(false);
          setIsSearchResultsOpen(false);
          setSelectedProduct(null);
          setSelectedCategoryId(GOPUFF_CATEGORIES[0]?.id || 'deals');
          setSelectedSubcategory(undefined);
        }}
        onSearch={() => {
          setPage(null);
          setIsBagOpen(false);
          setSelectedProduct(null);
          setIsSearchResultsOpen(false);
          setFocusSearchRequest((request) => request + 1);
        }}
        onBag={handleCartPress}
        onAccount={() => {
          setPage('account');
          setIsBagOpen(false);
          setIsSearchResultsOpen(false);
          setSelectedProduct(null);
        }}
      />
    )}
    <NavigationMenu
      visible={isMenuOpen}
      onClose={() => setIsMenuOpen(false)}
      onSignInPress={handleSignInPress}
      onSubcategorySelect={handleSubcategorySelect}
    />
    <AuthModal
      visible={isAuthOpen}
      onClose={() => setIsAuthOpen(false)}
      onAuthenticated={(profile) => {
        setAuthProfile(profile);
        setIsAuthOpen(false);
      }}
    />
    <LocationModal
      visible={isLocationOpen}
      location={savedLocation}
      onClose={() => setIsLocationOpen(false)}
      onSelect={handleLocationSelect}
    />
    </>
  );
}

const styles = StyleSheet.create({
  fontLoadingScreen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  loadingLogoSkeleton: {
    width: 150,
    height: 42,
    borderRadius: 12,
    marginBottom: 28,
  },
  loadingContentSkeleton: {
    width: '100%',
    height: 140,
    borderRadius: 18,
    marginBottom: 14,
  },
  pageContainer: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  mainScroll: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  scrollContentMobile: {
    paddingBottom: 92,
  },
  footerNote: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8FAFC',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    marginTop: 20,
  },
  footerText: {
    fontFamily: GOPUFF_FONTS.family,
    fontSize: 13,
    color: '#64748B',
    fontWeight: '500',
  },
});
