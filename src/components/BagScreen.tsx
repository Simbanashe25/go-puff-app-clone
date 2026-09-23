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
import { Feather } from '@expo/vector-icons';
import { Product } from '../data/products';
import { GOPUFF_FONTS } from '../constants/theme';
import { ProductCard } from './ProductCard';
import { GiftModal } from './GiftModal';
import { LoadingImage } from './LoadingImage';

const TRASH_ICON = require('../../assets/icons/trash (2).svg');
const PLUS_ICON = require('../../assets/icons/plus (2).svg');

export interface BagItem {
  product: Product;
  quantity: number;
}

interface BagScreenProps {
  items: BagItem[];
  recommendations: Product[];
  onBack: () => void;
  onProductPress: (product: Product) => void;
  onAdd: (product: Product) => void;
  onRemove: (product: Product) => void;
  onCheckout: () => void;
}

export const BagScreen: React.FC<BagScreenProps> = ({
  items,
  recommendations,
  onBack,
  onProductPress,
  onAdd,
  onRemove,
  onCheckout,
}) => {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const [isGiftOpen, setIsGiftOpen] = React.useState(false);
  const subtotal = items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );

  return (
    <View style={styles.screen}>
      <ScrollView
        style={styles.bagScroll}
        contentContainerStyle={[styles.scrollContent, isMobile && styles.scrollContentMobile]}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.layout, isMobile && styles.layoutMobile]}>
          <View style={styles.itemsColumn}>
            {items.length > 0 && (
              <>
                <TouchableOpacity onPress={onBack} style={styles.backButton}>
                  <Feather name="arrow-left" size={20} color="#111111" />
                  <Text style={styles.backText}>Continue shopping</Text>
                </TouchableOpacity>
                <Text style={styles.pageTitle}>MY BAG.</Text>
                <TouchableOpacity style={styles.giftRow} activeOpacity={0.75} onPress={() => setIsGiftOpen(true)}>
                  <Feather name="gift" size={28} color="#111111" />
                  <Text style={styles.giftText}>Make this order a gift</Text>
                  <Feather name="chevron-right" size={28} color="#111111" />
                </TouchableOpacity>
              </>
            )}

            {items.length === 0 ? (
              <>
                <Text style={styles.pageTitle}>MY BAG.</Text>
                <View style={styles.emptyState}>
                  <Text style={styles.emptyTitle}>Your bag is empty</Text>
                  <Text style={styles.emptyText}>Items you add to your bag will appear here.</Text>
                </View>
              </>
            ) : (
              items.map((item) => (
                <BagItemRow
                  key={item.product.id}
                  item={item}
                  isMobile={isMobile}
                  onAdd={onAdd}
                  onRemove={onRemove}
                  onProductPress={onProductPress}
                />
              ))
            )}

          </View>

          <View style={[styles.summaryColumn, isMobile && styles.summaryColumnMobile]}>
            <View style={styles.summaryCard}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Estimated Subtotal</Text>
                <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
              </View>
              <View style={styles.divider} />
              <TouchableOpacity style={styles.checkoutButton} onPress={onCheckout}>
                <Text style={styles.checkoutText}>CHECKOUT</Text>
              </TouchableOpacity>
              {items.length > 0 && (
                <View style={styles.savingsCard}>
                  <Text style={styles.savingsTitle}>UNLOCK MORE SAVINGS</Text>
                  <Text style={styles.savingsText}>
                    Join <Text style={styles.famText}>FAM</Text> for free delivery, unbeatable prices & exclusive perks.
                  </Text>
                  <TouchableOpacity style={styles.joinButton} onPress={onCheckout}>
                    <Text style={styles.joinText}>JOIN FAM AND SAVE</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </View>
        {recommendations.length > 0 && (
          <View style={styles.emptyRecommendations}>
            <View style={styles.recommendationHeader}>
              <Text style={styles.recommendationTitle}>
                {items.length === 0 ? 'TRENDING IN LOCATION.' : 'DID YOU ALSO WANT?'}
              </Text>
              <Text style={styles.moreItems}>MORE ITEMS  ›</Text>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.recommendationRow}
            >
              {recommendations.map((product) => (
                <View key={product.id} style={styles.recommendationCard}>
                  <ProductCard
                    product={product}
                    onAddToCart={onAdd}
                    onPress={onProductPress}
                  />
                </View>
              ))}
            </ScrollView>
          </View>
        )}
      </ScrollView>
      {isMobile && (
        <View style={styles.mobileCheckoutBar}>
          <View>
            <Text style={styles.mobileSubtotalLabel}>Estimated Subtotal</Text>
            <Text style={styles.mobileSubtotalValue}>${subtotal.toFixed(2)}</Text>
          </View>
          <TouchableOpacity style={styles.mobileCheckoutButton} onPress={onCheckout}>
            <Text style={styles.checkoutText}>CHECKOUT</Text>
          </TouchableOpacity>
        </View>
      )}
      <GiftModal
        visible={isGiftOpen}
        onClose={() => setIsGiftOpen(false)}
        onRemove={() => setIsGiftOpen(false)}
      />
    </View>
  );
};

const BagItemRow: React.FC<{
  item: BagItem;
  onAdd: (product: Product) => void;
  onRemove: (product: Product) => void;
  onProductPress: (product: Product) => void;
  isMobile: boolean;
}> = ({ item, onAdd, onRemove, onProductPress, isMobile }) => {
  const { product, quantity } = item;
  return (
    <View style={styles.itemRow}>
      <TouchableOpacity style={styles.itemInfo} onPress={() => onProductPress(product)}>
        <Text style={styles.itemPrice}>${product.price.toFixed(2)} <Text style={styles.eachPrice}>${(product.price / Math.max(1, quantity)).toFixed(2)}/each</Text></Text>
        <Text style={styles.itemName}>{product.name.replace(/\n/g, ' ')}</Text>
        <View style={styles.dealBadge}>
          <Text style={styles.dealText}>{product.discount || 'Aldi Price Match!'}</Text>
          <Text style={styles.dealLink}>Shop more deals ›</Text>
        </View>
      </TouchableOpacity>
      <LoadingImage source={product.imageSource} containerStyle={styles.itemImage} resizeMode="contain" />
      <View style={[styles.quantityPill, isMobile && styles.quantityPillMobile]}>
        <TouchableOpacity onPress={() => onRemove(product)} style={[styles.quantityButton, isMobile && styles.quantityButtonMobile]}>
          {quantity === 1 ? <Image source={TRASH_ICON} style={styles.trashIcon} /> : <Text style={styles.minus}>−</Text>}
        </TouchableOpacity>
        <Text style={styles.quantity}>{quantity}</Text>
        <TouchableOpacity onPress={() => onAdd(product)} style={[styles.quantityButton, isMobile && styles.quantityButtonMobile]}>
          <Image source={PLUS_ICON} style={styles.bagPlus} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, width: '100%', flexDirection: 'column', backgroundColor: '#FFFFFF' },
  bagScroll: { flex: 1, width: '100%', alignSelf: 'stretch' },
  scrollContent: { padding: 34, paddingTop: 26, width: '100%', minWidth: '100%' },
  scrollContentMobile: { padding: 16, paddingTop: 14, paddingBottom: 180 },
  layout: { flexDirection: 'row', gap: 28, maxWidth: 1400, width: '100%', minWidth: '100%', alignSelf: 'center' },
  layoutMobile: { flexDirection: 'column', gap: 18 },
  itemsColumn: { flex: 1, minWidth: 0 },
  summaryColumn: { width: '48%', maxWidth: 880 },
  summaryColumnMobile: { display: 'none' },
  backButton: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 16 },
  backText: { fontFamily: GOPUFF_FONTS.family, fontSize: 13, color: '#555555' },
  pageTitle: { fontFamily: GOPUFF_FONTS.family, fontSize: 30, fontWeight: '900', fontStyle: 'italic', marginBottom: 20 },
  giftRow: { flexDirection: 'row', alignItems: 'center', gap: 18, paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
  giftText: { flex: 1, fontFamily: GOPUFF_FONTS.family, fontSize: 20, color: '#374151' },
  emptyState: { alignItems: 'center', paddingVertical: 52 },
  emptyTitle: { fontFamily: GOPUFF_FONTS.family, fontSize: 19, fontWeight: '900', fontStyle: 'italic' },
  emptyText: { fontFamily: GOPUFF_FONTS.family, fontSize: 13, color: '#666666', marginTop: 8 },
  continueButton: { backgroundColor: '#8000FF', borderRadius: 24, paddingHorizontal: 26, paddingVertical: 12, marginTop: 18 },
  continueButtonText: { color: '#FFFFFF', fontFamily: GOPUFF_FONTS.family, fontSize: 13, fontWeight: '900', fontStyle: 'italic' },
  itemRow: { minHeight: 132, borderBottomWidth: 1, borderBottomColor: '#E5E7EB', position: 'relative', paddingVertical: 20, paddingRight: 160 },
  itemInfo: { flex: 1 },
  itemPrice: { fontFamily: GOPUFF_FONTS.family, fontSize: 20, fontWeight: '700' },
  eachPrice: { fontSize: 15, color: '#777777', fontWeight: '400' },
  itemName: { fontFamily: GOPUFF_FONTS.family, fontSize: 17, color: '#555555', marginTop: 9 },
  dealBadge: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', gap: 7, backgroundColor: '#FCE3E8', borderRadius: 5, paddingHorizontal: 7, paddingVertical: 4, marginTop: 7 },
  dealText: { fontFamily: GOPUFF_FONTS.family, color: '#A31437', fontSize: 13 },
  dealLink: { fontFamily: GOPUFF_FONTS.family, fontWeight: '900', fontSize: 13, textDecorationLine: 'underline' },
  itemImage: { position: 'absolute', right: 46, top: 16, width: 98, height: 68 },
  quantityPill: { position: 'absolute', right: 0, bottom: 16, width: 112, height: 42, borderRadius: 23, borderWidth: 1, borderColor: '#E5E7EB', backgroundColor: '#FFFFFF', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 6, ...Platform.select({ web: { boxShadow: '0 2px 7px rgba(15, 23, 42, 0.18)' } as any }) },
  quantityPillMobile: { width: 94, height: 38, borderRadius: 20, bottom: 12, paddingHorizontal: 3 },
  quantityButton: { width: 30, height: 34, justifyContent: 'center', alignItems: 'center' },
  quantityButtonMobile: { width: 24, height: 30 },
  trashIcon: { width: 17, height: 17 },
  bagPlus: { width: 19, height: 19 },
  minus: { fontSize: 24, color: '#8000FF', lineHeight: 24 },
  quantity: { fontFamily: GOPUFF_FONTS.family, color: '#8000FF', fontSize: 23, fontWeight: '900', fontStyle: 'italic' },
  summaryCard: { paddingTop: 18 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  summaryLabel: { fontFamily: GOPUFF_FONTS.family, fontSize: 26, fontWeight: '700' },
  summaryValue: { fontFamily: GOPUFF_FONTS.family, fontSize: 25, fontWeight: '700' },
  divider: { height: 1, backgroundColor: '#E5E7EB', marginVertical: 34 },
  checkoutButton: { height: 52, borderRadius: 27, backgroundColor: '#8000FF', alignItems: 'center', justifyContent: 'center' },
  checkoutText: { color: '#FFFFFF', fontFamily: GOPUFF_FONTS.family, fontSize: 19, fontWeight: '900', fontStyle: 'italic' },
  savingsCard: { backgroundColor: '#4B4B4B', borderRadius: 20, padding: 20, marginTop: 20, minHeight: 152 },
  savingsTitle: { fontFamily: GOPUFF_FONTS.family, color: '#FFFFFF', fontSize: 28, fontWeight: '900', fontStyle: 'italic' },
  savingsText: { fontFamily: GOPUFF_FONTS.family, color: '#FFFFFF', fontSize: 17, marginTop: 9 },
  famText: { color: '#FFFFFF', fontWeight: '900', fontStyle: 'italic' },
  joinButton: { alignSelf: 'flex-start', backgroundColor: '#8000FF', paddingHorizontal: 22, paddingVertical: 9, borderRadius: 21, marginTop: 15 },
  joinText: { color: '#FFFFFF', fontFamily: GOPUFF_FONTS.family, fontSize: 14, fontWeight: '900', fontStyle: 'italic' },
  recommendations: { marginTop: 30 },
  emptyRecommendations: { width: '100%', marginTop: 42, alignSelf: 'stretch' },
  recommendationHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  recommendationTitle: { fontFamily: GOPUFF_FONTS.family, fontSize: 22, fontWeight: '900', fontStyle: 'italic' },
  moreItems: { fontFamily: GOPUFF_FONTS.family, color: '#777777', fontSize: 14, fontWeight: '900', fontStyle: 'italic' },
  recommendationRow: { gap: 16, paddingVertical: 14, paddingLeft: 2, paddingRight: 32 },
  recommendationCard: { width: 160 },
  mobileCheckoutBar: { position: 'absolute', left: 0, right: 0, bottom: 68, minHeight: 78, paddingHorizontal: 18, paddingVertical: 10, backgroundColor: '#FFFFFF', borderTopWidth: 1, borderTopColor: '#E5E7EB', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 14, zIndex: 19, ...Platform.select({ web: { position: 'fixed' as any, boxShadow: '0 -3px 12px rgba(15, 23, 42, 0.14)' } as any }) },
  mobileSubtotalLabel: { fontFamily: GOPUFF_FONTS.family, fontSize: 13, color: '#555555' },
  mobileSubtotalValue: { fontFamily: GOPUFF_FONTS.family, fontSize: 20, fontWeight: '800', marginTop: 2 },
  mobileCheckoutButton: { flex: 1, maxWidth: 250, height: 48, borderRadius: 25, backgroundColor: '#8000FF', alignItems: 'center', justifyContent: 'center' },
});
