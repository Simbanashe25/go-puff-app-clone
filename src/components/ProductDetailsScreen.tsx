import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { NutritionRow, Product } from '../data/products';
import { GOPUFF_FONTS } from '../constants/theme';
import { ProductsSection } from './ProductsSection';
import { TopNav } from './TopNav';

const SHOPPING_BAG_ICON = require('../../assets/icons/shopping-bag (3).svg');
const PLUS_ICON = require('../../assets/icons/plus (2).svg');
const TRASH_ICON = require('../../assets/icons/trash (2).svg');

interface ProductDetailsScreenProps {
  product: Product;
  similarProducts: Product[];
  onBack: () => void;
  onAddToCart: (product: Product) => void;
  onRemoveFromCart?: (product: Product) => void;
  onProductPress: (product: Product) => void;
  cartCount: number;
  onMenuPress: () => void;
  onSignInPress: () => void;
  onCartPress: () => void;
  onCheckoutPress: () => void;
  onLogoPress: () => void;
  searchProducts?: Product[];
  onSearchProductPress?: (product: Product) => void;
  locationName?: string;
  onLocationPress?: () => void;
}

export const ProductDetailsScreen: React.FC<ProductDetailsScreenProps> = ({
  product,
  similarProducts,
  onBack,
  onAddToCart,
  onRemoveFromCart,
  onProductPress,
  cartCount,
  onMenuPress,
  onSignInPress,
  onCartPress,
  onCheckoutPress,
  onLogoPress,
  searchProducts,
  onSearchProductPress,
  locationName,
  onLocationPress,
}) => {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const isDiscounted = product.originalPrice > product.price;
  const [quantity, setQuantity] = React.useState(0);
  const description = product.name.replace(/\n/g, ' ');
  const detailTabs = [
    ...(product.highlights ? ['Highlights' as const] : []),
    ...(product.nutrition ? ['Nutrition' as const] : []),
    'Description' as const,
  ];
  const [activeDetailTab, setActiveDetailTab] = React.useState<
    'Highlights' | 'Nutrition' | 'Description'
  >(detailTabs[0]);
  React.useEffect(() => {
    setActiveDetailTab(detailTabs[0]);
    setQuantity(0);
  }, [product.id]);

  const addProduct = () => {
    setQuantity((previous) => previous + 1);
    onAddToCart(product);
  };

  const removeProduct = () => {
    setQuantity((previous) => {
      if (previous > 0) {
        onRemoveFromCart?.(product);
      }
      return Math.max(0, previous - 1);
    });
  };

  return (
    <View style={styles.screen}>
      <TopNav
        cartCount={cartCount}
        onMenuPress={onMenuPress}
        onSignInPress={onSignInPress}
        onCartPress={onCartPress}
        onLogoPress={onLogoPress}
        searchProducts={searchProducts}
        onSearchProductPress={onSearchProductPress}
        locationName={locationName}
        onLocationPress={onLocationPress}
      />

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          isMobile && styles.scrollContentMobile,
        ]}
        showsVerticalScrollIndicator
      >
        <TouchableOpacity
          accessibilityLabel="Back to home"
          onPress={onBack}
          style={styles.backButton}
        >
          <Feather name="arrow-left" size={24} color="#111111" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <View style={[styles.productLayout, isMobile && styles.productLayoutMobile]}>
          <View style={[styles.galleryColumn, isMobile && styles.galleryColumnMobile]}>
            <View style={[styles.mainImageFrame, isMobile && styles.mainImageFrameMobile]}>
              <Image
                source={product.imageSource}
                resizeMode="contain"
                style={styles.mainImage}
              />
            </View>
            <View style={[styles.thumbnailRow, isMobile && styles.thumbnailRowMobile]}>
              <View style={[styles.thumbnailActive, isMobile && styles.thumbnailMobile]}>
                <Image
                  source={product.imageSource}
                  resizeMode="contain"
                  style={styles.thumbnailImage}
                />
              </View>
              <View style={[styles.thumbnailPlaceholder, isMobile && styles.thumbnailMobile]}>
                <Ionicons name="image-outline" size={22} color="#9CA3AF" />
              </View>
            </View>
          </View>

          <View style={[styles.detailsColumn, isMobile && styles.detailsColumnMobile]}>
            <Text style={[styles.productTitle, isMobile && styles.productTitleMobile]}>
              {description.toUpperCase()}
            </Text>
            <View style={[styles.priceRow, isMobile && styles.priceRowMobile]}>
              <Text style={[styles.price, !isDiscounted && styles.regularPrice]}>
                ${product.price.toFixed(2)}
              </Text>
              {isDiscounted && (
                <Text style={styles.originalPrice}>
                  ${product.originalPrice.toFixed(2)}
                </Text>
              )}
            </View>
            <Text style={styles.unitInfo}>{product.unitInfo}</Text>

            {!isMobile && (
              <DetailsCartActions
                quantity={quantity}
                onAdd={addProduct}
                onRemove={removeProduct}
                onBagPress={onCartPress}
                onCheckoutPress={onCheckoutPress}
                productName={product.name}
                compact
              />
            )}

            <View style={[styles.coveragePanel, isMobile && styles.coveragePanelMobile]}>
              <Text style={[styles.coverageTitle, isMobile && styles.coverageTitleMobile]}>
                GOPUFF'S GOT YOU COVERED.
              </Text>
              <View style={[styles.coverageGrid, isMobile && styles.coverageGridMobile]}>
                <Benefit mobile={isMobile} icon="flash-outline" title="Fastest delivery." text="Arrives in as fast as 15 minutes." />
                <Benefit mobile={isMobile} icon="storefront-outline" title="We do it all." text="We pick, pack, and deliver." />
                <Benefit mobile={isMobile} icon="cube-outline" title="Wide assortment." text="Instant access to 5,000+ items." />
                <Benefit mobile={isMobile} icon="cash-outline" title="Best value." text="No markups or service fees." />
              </View>
            </View>

            <View style={[styles.descriptionSection, isMobile && styles.descriptionSectionMobile]}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={[
                  styles.detailTabs,
                  isMobile && styles.detailTabsMobile,
                ]}
              >
                {detailTabs.map((tab) => (
                  <TouchableOpacity
                    key={tab}
                    onPress={() => setActiveDetailTab(tab)}
                    style={[
                      styles.detailTab,
                      isMobile && styles.detailTabMobile,
                      activeDetailTab === tab && styles.detailTabActive,
                    ]}
                  >
                    <Text
                      style={[
                        styles.detailTabText,
                        isMobile && styles.detailTabTextMobile,
                        activeDetailTab === tab && styles.detailTabTextActive,
                      ]}
                    >
                      {tab}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <View style={styles.detailTabRule} />
              <DetailContent
                product={product}
                activeTab={activeDetailTab}
                description={description}
                mobile={isMobile}
              />
            </View>
          </View>
        </View>

        <ProductsSection
          title="SIMILAR PRODUCTS."
          products={similarProducts}
          onAddToCart={onAddToCart}
          onProductPress={onProductPress}
          onSeeAllPress={() => undefined}
          seeAllLabel="MORE ITEMS"
        />
      </ScrollView>
      {isMobile && (
        <View style={styles.mobileBottomBar}>
          <DetailsCartActions
            quantity={quantity}
            onAdd={addProduct}
            onRemove={removeProduct}
            onBagPress={onCartPress}
            onCheckoutPress={onCheckoutPress}
            productName={product.name}
            compact
          />
        </View>
      )}
    </View>
  );
};

const DetailsCartActions: React.FC<{
  quantity: number;
  onAdd: () => void;
  onRemove: () => void;
  onBagPress: () => void;
  onCheckoutPress: () => void;
  productName: string;
  compact?: boolean;
}> = ({ quantity, onAdd, onRemove, onBagPress, onCheckoutPress, productName, compact = false }) => (
  <View style={[styles.detailsActions, compact && styles.detailsActionsMobile]}>
    {quantity === 0 ? (
      <TouchableOpacity
        style={[styles.addToCartButton, compact && styles.addToCartButtonMobile]}
        onPress={onAdd}
        accessibilityLabel={`Add ${productName} to cart`}
      >
        <Text style={styles.addToCartText}>ADD TO CART</Text>
      </TouchableOpacity>
    ) : (
      <View style={styles.detailsQuantityPill}>
        <TouchableOpacity onPress={onRemove} style={styles.detailsQuantityButton}>
          <Image source={TRASH_ICON} style={styles.detailsTrashIcon} />
        </TouchableOpacity>
        <Text style={styles.detailsQuantityText}>{quantity}</Text>
        <TouchableOpacity onPress={onAdd} style={styles.detailsQuantityButton}>
          <Image source={PLUS_ICON} style={styles.detailsPlusIcon} />
        </TouchableOpacity>
      </View>
    )}
    {quantity > 0 && (
      <>
        <TouchableOpacity style={styles.myBagButton} onPress={onBagPress}>
          <Image source={SHOPPING_BAG_ICON} style={styles.myBagIcon} />
          <Text style={styles.myBagText}>MY BAG</Text>
          <View style={styles.bagCountBadge}>
            <Text style={styles.bagCountText}>{quantity}</Text>
          </View>
        </TouchableOpacity>
      </>
    )}
  </View>
);

const Benefit = ({
  icon,
  title,
  text,
  mobile = false,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  text: string;
  mobile?: boolean;
}) => (
  <View style={[styles.benefit, mobile && styles.benefitMobile]}>
    <Ionicons name={icon} size={21} color="#111111" style={styles.benefitIcon} />
    <View style={styles.benefitCopy}>
      <Text style={styles.benefitTitle}>{title}</Text>
      <Text style={styles.benefitText}>{text}</Text>
    </View>
  </View>
);

const DetailContent = ({
  product,
  activeTab,
  description,
  mobile,
}: {
  product: Product;
  activeTab: 'Highlights' | 'Nutrition' | 'Description';
  description: string;
  mobile: boolean;
}) => {
  if (activeTab === 'Highlights') {
    return (
      <View style={[styles.detailContent, mobile && styles.detailContentMobile]}>
        {product.highlights?.map((section) => (
          <View key={section.title} style={styles.highlightSection}>
            <Text style={[styles.detailHeading, mobile && styles.detailHeadingMobile]}>
              {section.title}
            </Text>
            <Text style={[styles.detailBody, mobile && styles.detailBodyMobile]}>
              {section.content}
            </Text>
          </View>
        ))}
      </View>
    );
  }

  if (activeTab === 'Nutrition') {
    return (
      <View style={[styles.detailContent, mobile && styles.detailContentMobile]}>
        {product.nutrition?.map((row: NutritionRow) => (
          <View key={row.label} style={styles.nutritionRow}>
            <Text style={[styles.detailBody, mobile && styles.detailBodyMobile]}>{row.label}</Text>
            <Text style={[styles.detailBody, mobile && styles.detailBodyMobile]}>{row.value}</Text>
          </View>
        ))}
      </View>
    );
  }

  return (
    <View style={[styles.detailContent, mobile && styles.detailContentMobile]}>
      <Text style={[styles.detailBody, mobile && styles.detailBodyMobile]}>
        {description}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    padding: 8,
    marginLeft: 4,
    marginBottom: 8,
  },
  backText: {
    fontFamily: GOPUFF_FONTS.family,
    fontSize: 15,
    color: '#111111',
    marginLeft: 6,
  },
  scrollContent: {
    paddingTop: 42,
    paddingBottom: 40,
  },
  scrollContentMobile: {
    paddingTop: 20,
    paddingBottom: 112,
  },
  productLayout: {
    width: '92%',
    maxWidth: 1320,
    alignSelf: 'center',
    flexDirection: 'row',
    gap: 48,
  },
  productLayoutMobile: {
    width: 'auto',
    marginHorizontal: 16,
    flexDirection: 'column',
    gap: 0,
  },
  galleryColumn: {
    flex: 1,
    minWidth: 0,
  },
  galleryColumnMobile: {
    flex: 0,
    width: '100%',
    height: 438,
    flexBasis: 438,
  },
  mainImageFrame: {
    height: 520,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainImageFrameMobile: {
    height: 340,
  },
  mainImage: {
    width: '92%',
    height: '92%',
  },
  thumbnailRow: {
    flexDirection: 'row',
    gap: 18,
    marginTop: 28,
    justifyContent: 'center',
  },
  thumbnailRowMobile: {
    marginTop: 16,
    gap: 12,
  },
  thumbnailActive: {
    width: 128,
    height: 128,
    borderWidth: 1,
    borderColor: '#111111',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbnailPlaceholder: {
    width: 128,
    height: 128,
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbnailMobile: {
    width: 82,
    height: 82,
  },
  thumbnailImage: {
    width: '90%',
    height: '90%',
  },
  detailsColumn: {
    flex: 1,
    minWidth: 0,
    paddingTop: 4,
  },
  detailsColumnMobile: {
    flex: 0,
    width: '100%',
    paddingTop: 28,
  },
  productTitle: {
    fontFamily: GOPUFF_FONTS.family,
    fontSize: 30,
    lineHeight: 35,
    fontWeight: '900',
    fontStyle: 'italic',
    textDecorationLine: 'underline',
    color: '#000000',
  },
  productTitleMobile: {
    fontSize: 24,
    lineHeight: 29,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
    marginTop: 30,
  },
  priceRowMobile: {
    marginTop: 18,
  },
  price: {
    fontFamily: GOPUFF_FONTS.family,
    fontSize: 24,
    fontWeight: '900',
    color: '#00875A',
  },
  regularPrice: {
    color: '#111111',
  },
  originalPrice: {
    fontFamily: GOPUFF_FONTS.family,
    fontSize: 19,
    color: '#6B7280',
    textDecorationLine: 'line-through',
  },
  unitInfo: {
    fontFamily: GOPUFF_FONTS.family,
    color: '#4B5563',
    fontSize: 17,
    marginTop: 6,
  },
  addToCartButton: {
    flex: 1,
    minHeight: 56,
    borderRadius: 30,
    backgroundColor: '#00A3FF',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
    marginTop: 28,
  },
  addToCartText: {
    fontFamily: GOPUFF_FONTS.family,
    fontSize: 17,
    fontWeight: '900',
    fontStyle: 'italic',
    color: '#FFFFFF',
  },
  addToCartButtonMobile: {
    width: '100%',
    marginTop: 0,
  },
  detailsActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 28,
  },
  detailsQuantityPill: {
    width: 250,
    height: 56,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    ...Platform.select({
      web: { boxShadow: '0 2px 7px rgba(15, 23, 42, 0.18)' } as any,
    }),
  },
  detailsQuantityButton: {
    width: 40,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailsAddIcon: {
    width: 20,
    height: 20,
    tintColor: '#FFFFFF',
  },
  detailsTrashIcon: {
    width: 20,
    height: 20,
  },
  detailsPlusIcon: {
    width: 24,
    height: 24,
  },
  detailsQuantityText: {
    fontFamily: GOPUFF_FONTS.family,
    color: '#1111EE',
    fontSize: 28,
    fontWeight: '900',
    fontStyle: 'italic',
  },
  myBagButton: {
    flex: 1,
    height: 56,
    borderRadius: 30,
    backgroundColor: '#1111EE',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 18,
    position: 'relative',
  },
  myBagIcon: {
    width: 26,
    height: 26,
    tintColor: '#FFFFFF',
  },
  myBagText: {
    fontFamily: GOPUFF_FONTS.family,
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '900',
    fontStyle: 'italic',
  },
  bagCountBadge: {
    position: 'absolute',
    top: 7,
    left: '50%',
    marginLeft: -48,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFC83D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bagCountText: {
    fontFamily: GOPUFF_FONTS.family,
    fontSize: 17,
    fontWeight: '900',
    color: '#111111',
  },
  mobileBottomBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 68,
    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 12,
    backgroundColor: '#FFFFFF',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#D1D5DB',
    zIndex: 20,
    ...Platform.select({
      web: {
        position: 'fixed' as any,
        boxShadow: '0 -3px 12px rgba(15, 23, 42, 0.12)',
      } as any,
    }),
  },
  detailsActionsMobile: {
    marginTop: 0,
  },
  mobileCartActions: {
    width: '100%',
  },
  coveragePanel: {
    borderWidth: 1,
    borderColor: '#00A3FF',
    borderRadius: 12,
    padding: 24,
    marginTop: 36,
  },
  coveragePanelMobile: {
    padding: 18,
    marginTop: 28,
  },
  coverageTitle: {
    fontFamily: GOPUFF_FONTS.family,
    fontSize: 23,
    fontWeight: '900',
    fontStyle: 'italic',
    color: '#000000',
    marginBottom: 22,
  },
  coverageTitleMobile: {
    fontSize: 19,
    lineHeight: 24,
    marginBottom: 18,
  },
  coverageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: 22,
  },
  coverageGridMobile: {
    rowGap: 18,
  },
  benefit: {
    width: '50%',
    flexDirection: 'row',
    paddingRight: 16,
  },
  benefitMobile: {
    width: '100%',
    paddingRight: 0,
  },
  benefitIcon: {
    marginRight: 14,
    marginTop: 2,
  },
  benefitCopy: {
    flex: 1,
  },
  benefitTitle: {
    fontFamily: GOPUFF_FONTS.family,
    fontSize: 17,
    fontWeight: '700',
    color: '#111111',
  },
  benefitText: {
    fontFamily: GOPUFF_FONTS.family,
    fontSize: 15,
    lineHeight: 22,
    color: '#374151',
    marginTop: 3,
  },
  descriptionSection: {
    marginTop: 44,
  },
  descriptionSectionMobile: {
    marginTop: 32,
  },
  detailTabs: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 28,
  },
  detailTabsMobile: {
    minWidth: '100%',
    gap: 18,
    paddingTop: 4,
    paddingRight: 16,
    paddingBottom: 8,
    alignItems: 'center',
    minHeight: 38,
  },
  detailTab: {
    paddingBottom: 10,
  },
  detailTabMobile: {
    paddingBottom: 9,
  },
  detailTabActive: {
    borderBottomWidth: 3,
    borderBottomColor: '#111111',
  },
  detailTabText: {
    fontFamily: GOPUFF_FONTS.family,
    fontSize: 21,
    color: '#4B5563',
  },
  detailTabTextMobile: {
    fontSize: 16,
    lineHeight: 22,
  },
  detailTabTextActive: {
    color: '#111111',
    fontWeight: '700',
  },
  detailTabRule: {
    height: 1,
    backgroundColor: '#9CA3AF',
  },
  detailContent: {
    paddingTop: 30,
  },
  detailContentMobile: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  highlightSection: {
    marginBottom: 28,
  },
  detailHeading: {
    fontFamily: GOPUFF_FONTS.family,
    fontSize: 22,
    fontWeight: '700',
    color: '#111111',
    marginBottom: 12,
  },
  detailHeadingMobile: {
    fontSize: 19,
    marginBottom: 8,
  },
  detailBody: {
    fontFamily: GOPUFF_FONTS.family,
    fontSize: 18,
    lineHeight: 26,
    color: '#4B4B4B',
  },
  detailBodyMobile: {
    fontSize: 16,
    lineHeight: 23,
  },
  nutritionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#D1D5DB',
    paddingVertical: 12,
  },
});
