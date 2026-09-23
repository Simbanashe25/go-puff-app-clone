import React, { useMemo, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { BagItem } from './BagScreen';
import { TopNav } from './TopNav';
import { Product } from '../data/products';
import {
  GOPUFF_COLORS,
  GOPUFF_FONTS,
  GOPUFF_RADII,
  GOPUFF_SHADOWS,
  GOPUFF_SIZES,
  GOPUFF_SPACING,
} from '../constants/theme';

interface CheckoutScreenProps {
  items: BagItem[];
  cartCount: number;
  isAuthenticated: boolean;
  accountName?: string;
  locationName: string;
  onLocationPress: () => void;
  onMenuPress: () => void;
  onSignInPress: () => void;
  onCartPress: () => void;
  onLogoPress: () => void;
  searchProducts: Product[];
  onSearchProductPress: (product: Product) => void;
  onSearchChange: (text: string) => void;
  onSearchSubmit: (query?: string) => void;
  focusSearchRequest?: number;
  onBack: () => void;
  onComplete: () => void;
}

export const CheckoutScreen: React.FC<CheckoutScreenProps> = ({
  items,
  cartCount,
  isAuthenticated,
  accountName,
  locationName,
  onLocationPress,
  onMenuPress,
  onSignInPress,
  onCartPress,
  onLogoPress,
  searchProducts,
  onSearchProductPress,
  onSearchChange,
  onSearchSubmit,
  focusSearchRequest,
  onBack,
  onComplete,
}) => {
  const { width } = useWindowDimensions();
  const isMobile = width < GOPUFF_SIZES.desktopBreakpoint;
  const [payment, setPayment] = useState<'card' | 'apple'>('card');
  const [cardNumber, setCardNumber] = useState('');
  const [error, setError] = useState('');
  const subtotal = useMemo(() => items.reduce((sum, item) => sum + item.product.price * item.quantity, 0), [items]);
  const delivery = subtotal >= 30 ? 0 : 2.99;
  const total = subtotal + delivery;

  const placeOrder = () => {
    if (payment === 'card' && cardNumber.replace(/\D/g, '').length < 12) {
      setError('Enter a valid card number to continue.');
      return;
    }
    setError('');
    onComplete();
  };

  return (
    <View style={styles.screen}>
      <TopNav
        cartCount={cartCount}
        isAuthenticated={isAuthenticated}
        accountName={accountName}
        locationName={locationName}
        onLocationPress={onLocationPress}
        onMenuPress={onMenuPress}
        onSignInPress={onSignInPress}
        onCartPress={onCartPress}
        onLogoPress={onLogoPress}
        searchProducts={searchProducts}
        onSearchProductPress={onSearchProductPress}
        onSearchChange={onSearchChange}
        onSearchSubmit={onSearchSubmit}
        focusSearchRequest={focusSearchRequest}
      />
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Feather name="arrow-left" size={20} color={GOPUFF_COLORS.black} />
          <Text style={styles.backText}>MY BAG</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={[styles.content, isMobile && styles.contentMobile]} showsVerticalScrollIndicator={false}>
        <View style={[styles.layout, isMobile && styles.layoutMobile]}>
          <View style={styles.formColumn}>
            <Text style={styles.pageTitle}>CHECKOUT.</Text>

            <CheckoutSection title="DELIVERY LOCATION">
              <TouchableOpacity style={styles.locationRow} onPress={onLocationPress}>
                <View style={styles.iconCircle}><Feather name="map-pin" size={20} color={GOPUFF_COLORS.action} /></View>
                <View style={styles.flex}>
                  <Text style={styles.cardTitle}>{locationName}</Text>
                  <Text style={styles.cardSubtext}>Delivery in 12 mins · Open 24 hrs</Text>
                </View>
                <Feather name="chevron-right" size={22} color={GOPUFF_COLORS.black} />
              </TouchableOpacity>
            </CheckoutSection>

            <CheckoutSection title="DELIVERY DETAILS">
              <View style={styles.inputRow}>
                <TextInput style={styles.input} placeholder="First name" placeholderTextColor={GOPUFF_COLORS.placeholder} />
                <TextInput style={styles.input} placeholder="Last name" placeholderTextColor={GOPUFF_COLORS.placeholder} />
              </View>
              <TextInput style={styles.input} placeholder="Phone number" placeholderTextColor={GOPUFF_COLORS.placeholder} keyboardType="phone-pad" />
              <TextInput style={styles.input} placeholder="Delivery instructions (optional)" placeholderTextColor={GOPUFF_COLORS.placeholder} />
            </CheckoutSection>

            <CheckoutSection title="PAYMENT">
              <TouchableOpacity style={styles.paymentOption} onPress={() => setPayment('card')}>
                <View style={[styles.radio, payment === 'card' && styles.radioSelected]} />
                <View style={styles.flex}>
                  <Text style={styles.cardTitle}>Debit or credit card</Text>
                  <Text style={styles.cardSubtext}>Secure payment</Text>
                </View>
                <Ionicons name="card-outline" size={24} color={GOPUFF_COLORS.black} />
              </TouchableOpacity>
              {payment === 'card' && (
                <TextInput
                  style={styles.input}
                  value={cardNumber}
                  onChangeText={(value) => { setCardNumber(value); setError(''); }}
                  placeholder="Card number"
                  placeholderTextColor={GOPUFF_COLORS.placeholder}
                  keyboardType="number-pad"
                />
              )}
              <TouchableOpacity style={styles.paymentOption} onPress={() => setPayment('apple')}>
                <View style={[styles.radio, payment === 'apple' && styles.radioSelected]} />
                <Text style={styles.cardTitle}>Apple Pay</Text>
                <Ionicons name="logo-apple" size={22} color={GOPUFF_COLORS.black} />
              </TouchableOpacity>
              {!!error && <Text style={styles.errorText}>{error}</Text>}
            </CheckoutSection>
          </View>

          <View style={[styles.summaryColumn, isMobile && styles.summaryColumnMobile]}>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryTitle}>YOUR ORDER.</Text>
              {items.map((item) => (
                <View key={item.product.id} style={styles.orderRow}>
                  <Text style={styles.orderQuantity}>{item.quantity}x</Text>
                  <Text style={styles.orderName} numberOfLines={1}>{item.product.name.replace(/\n/g, ' ')}</Text>
                  <Image source={item.product.imageSource} style={styles.orderImage} resizeMode="contain" />
                  <Text style={styles.orderPrice}>${(item.product.price * item.quantity).toFixed(2)}</Text>
                </View>
              ))}
              <View style={styles.divider} />
              <SummaryRow label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
              <SummaryRow label="Delivery" value={delivery ? `$${delivery.toFixed(2)}` : 'FREE'} />
              <View style={styles.divider} />
              <SummaryRow label="Total" value={`$${total.toFixed(2)}`} total />
              {!isMobile && (
                <TouchableOpacity style={styles.placeButton} onPress={placeOrder}>
                  <Text style={styles.buttonText}>PLACE ORDER</Text>
                </TouchableOpacity>
              )}
              <View style={styles.savingsCard}>
                <Text style={styles.savingsTitle}>UNLOCK MORE SAVINGS</Text>
                <Text style={styles.savingsText}>Join <Text style={styles.famText}>FAM</Text> for free delivery, unbeatable prices & exclusive perks.</Text>
                <View style={styles.joinButton}>
                  <Text style={styles.joinText}>JOIN FAM AND SAVE</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      {isMobile && (
        <View style={styles.mobileBar}>
          <View><Text style={styles.mobileLabel}>TOTAL</Text><Text style={styles.mobileTotal}>${total.toFixed(2)}</Text></View>
          <TouchableOpacity style={styles.mobileButton} onPress={placeOrder}><Text style={styles.buttonText}>PLACE ORDER</Text></TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const CheckoutSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <View style={styles.section}><Text style={styles.sectionTitle}>{title}</Text>{children}</View>
);

const SummaryRow: React.FC<{ label: string; value: string; total?: boolean }> = ({ label, value, total }) => (
  <View style={styles.summaryRow}>
    <Text style={total ? styles.totalLabel : styles.label}>{label}</Text>
    <Text style={total ? styles.totalValue : styles.value}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: GOPUFF_COLORS.white },
  header: { height: 58, paddingHorizontal: 34, backgroundColor: GOPUFF_COLORS.white, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: GOPUFF_COLORS.borderLight, flexDirection: 'row', alignItems: 'center' },
  backButton: { flexDirection: 'row', alignItems: 'center', gap: GOPUFF_SPACING.sm },
  backText: { fontFamily: GOPUFF_FONTS.family, fontSize: 13, color: GOPUFF_COLORS.grayText },
  content: { padding: 34, paddingTop: 26, paddingBottom: GOPUFF_SPACING.xxl, maxWidth: 1400, width: '100%', alignSelf: 'center' },
  contentMobile: { padding: GOPUFF_SPACING.lg, paddingTop: GOPUFF_SPACING.md, paddingBottom: 100 },
  layout: { flexDirection: 'row', gap: GOPUFF_SPACING.xxl },
  layoutMobile: { flexDirection: 'column', gap: GOPUFF_SPACING.lg },
  formColumn: { flex: 1 },
  pageTitle: { fontFamily: GOPUFF_FONTS.family, fontSize: 30, fontWeight: '900', fontStyle: 'italic', color: GOPUFF_COLORS.black, marginBottom: GOPUFF_SPACING.xl },
  section: { backgroundColor: GOPUFF_COLORS.surface, borderBottomWidth: 1, borderBottomColor: GOPUFF_COLORS.borderLight, paddingBottom: GOPUFF_SPACING.xl, marginBottom: GOPUFF_SPACING.xl },
  sectionTitle: { fontFamily: GOPUFF_FONTS.family, fontSize: 22, fontWeight: '900', fontStyle: 'italic', color: GOPUFF_COLORS.black, marginBottom: GOPUFF_SPACING.lg },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: GOPUFF_SPACING.md },
  iconCircle: { width: 42, height: 42, borderRadius: 21, backgroundColor: GOPUFF_COLORS.infoBackground, alignItems: 'center', justifyContent: 'center' },
  flex: { flex: 1 },
  cardTitle: { fontFamily: GOPUFF_FONTS.bold, fontSize: 17, fontWeight: '800', color: GOPUFF_COLORS.black },
  cardSubtext: { fontFamily: GOPUFF_FONTS.regular, fontSize: 15, color: GOPUFF_COLORS.grayText, marginTop: 3 },
  inputRow: { width: '100%', flexDirection: 'row', alignItems: 'flex-start', gap: GOPUFF_SPACING.md },
  input: { flex: 1, minWidth: 0, height: GOPUFF_SIZES.controlHeight, minHeight: GOPUFF_SIZES.controlHeight, maxHeight: GOPUFF_SIZES.controlHeight, borderWidth: 1, borderColor: GOPUFF_COLORS.border, borderRadius: GOPUFF_RADII.sm, paddingHorizontal: GOPUFF_SPACING.md, paddingVertical: 0, marginBottom: GOPUFF_SPACING.md, fontFamily: GOPUFF_FONTS.regular, fontSize: 16, color: GOPUFF_COLORS.black, backgroundColor: GOPUFF_COLORS.white },
  paymentOption: { minHeight: 64, flexDirection: 'row', alignItems: 'center', gap: GOPUFF_SPACING.md, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: GOPUFF_COLORS.borderLight, marginBottom: GOPUFF_SPACING.md },
  radio: { width: 26, height: 26, borderRadius: 13, borderWidth: 2, borderColor: GOPUFF_COLORS.borderDark },
  radioSelected: { borderColor: GOPUFF_COLORS.action, backgroundColor: GOPUFF_COLORS.action },
  errorText: { fontFamily: GOPUFF_FONTS.regular, color: '#B42318', fontSize: 13 },
  summaryColumn: { width: '48%', maxWidth: 520, paddingTop: GOPUFF_SPACING.xl },
  summaryColumnMobile: { width: '100%', paddingTop: 0 },
  summaryCard: { backgroundColor: GOPUFF_COLORS.surface, paddingTop: GOPUFF_SPACING.sm },
  summaryTitle: { fontFamily: GOPUFF_FONTS.family, fontSize: 22, fontWeight: '900', fontStyle: 'italic', color: GOPUFF_COLORS.black, marginBottom: GOPUFF_SPACING.lg },
  orderRow: { flexDirection: 'row', alignItems: 'center', gap: GOPUFF_SPACING.sm, marginBottom: GOPUFF_SPACING.md },
  orderQuantity: { width: 25, fontFamily: GOPUFF_FONTS.bold, color: GOPUFF_COLORS.action },
  orderName: { flex: 1, fontFamily: GOPUFF_FONTS.regular, fontSize: 14, color: GOPUFF_COLORS.dark },
  orderImage: { width: 36, height: 36, marginHorizontal: GOPUFF_SPACING.xs },
  orderPrice: { fontFamily: GOPUFF_FONTS.bold, fontSize: 14, color: GOPUFF_COLORS.black },
  divider: { height: 1, backgroundColor: GOPUFF_COLORS.borderLight, marginVertical: GOPUFF_SPACING.lg },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: GOPUFF_SPACING.sm },
  label: { fontFamily: GOPUFF_FONTS.regular, fontSize: 15, color: GOPUFF_COLORS.grayText },
  value: { fontFamily: GOPUFF_FONTS.bold, fontSize: 15, color: GOPUFF_COLORS.black },
  totalLabel: { fontFamily: GOPUFF_FONTS.black, fontSize: 20, fontWeight: '900', color: GOPUFF_COLORS.black },
  totalValue: { fontFamily: GOPUFF_FONTS.black, fontSize: 22, fontWeight: '900', color: GOPUFF_COLORS.action },
  placeButton: { height: 62, borderRadius: GOPUFF_RADII.pill, backgroundColor: GOPUFF_COLORS.action, alignItems: 'center', justifyContent: 'center', marginTop: GOPUFF_SPACING.lg },
  buttonText: { fontFamily: GOPUFF_FONTS.black, fontSize: 17, fontWeight: '900', fontStyle: 'italic', color: GOPUFF_COLORS.white },
  savingsCard: { backgroundColor: GOPUFF_COLORS.infoBackground, borderRadius: GOPUFF_RADII.lg, padding: GOPUFF_SPACING.xl, marginTop: GOPUFF_SPACING.xl },
  savingsTitle: { fontFamily: GOPUFF_FONTS.family, fontSize: 28, fontWeight: '900', fontStyle: 'italic', color: GOPUFF_COLORS.grayText },
  savingsText: { fontFamily: GOPUFF_FONTS.regular, fontSize: 15, lineHeight: 22, color: GOPUFF_COLORS.grayText, marginTop: GOPUFF_SPACING.sm },
  famText: { fontFamily: GOPUFF_FONTS.black, color: '#0872B9' },
  joinButton: { alignSelf: 'flex-start', backgroundColor: GOPUFF_COLORS.action, paddingHorizontal: 22, paddingVertical: 9, borderRadius: GOPUFF_RADII.pill, marginTop: 15 },
  joinText: { color: GOPUFF_COLORS.white, fontFamily: GOPUFF_FONTS.family, fontSize: 14, fontWeight: '900', fontStyle: 'italic' },
  mobileBar: { position: 'absolute', left: 0, right: 0, bottom: 0, padding: GOPUFF_SPACING.md, backgroundColor: GOPUFF_COLORS.white, borderTopWidth: 1, borderTopColor: GOPUFF_COLORS.borderLight, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', ...GOPUFF_SHADOWS.card },
  mobileLabel: { fontFamily: GOPUFF_FONTS.bold, fontSize: 11, fontWeight: '900', color: GOPUFF_COLORS.grayText },
  mobileTotal: { fontFamily: GOPUFF_FONTS.black, fontSize: 20, color: GOPUFF_COLORS.black },
  mobileButton: { height: GOPUFF_SIZES.compactControlHeight, paddingHorizontal: GOPUFF_SPACING.xl, borderRadius: GOPUFF_RADII.pill, backgroundColor: GOPUFF_COLORS.action, alignItems: 'center', justifyContent: 'center' },
});
