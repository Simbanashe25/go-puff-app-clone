import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { BagItem } from './BagScreen';
import { GOPUFF_COLORS, GOPUFF_FONTS, GOPUFF_RADII, GOPUFF_SIZES, GOPUFF_SPACING } from '../constants/theme';

interface Props {
  items: BagItem[];
  total: number;
  orderNumber: string;
  locationName: string;
  onTrack: () => void;
  onContinue: () => void;
}

export const OrderConfirmationScreen: React.FC<Props> = ({ items, total, orderNumber, locationName, onTrack, onContinue }) => (
  <View style={styles.screen}>
    <ScrollView contentContainerStyle={styles.content}>
      <View style={styles.successIcon}><Feather name="check" size={38} color={GOPUFF_COLORS.white} /></View>
      <Text style={styles.title}>ORDER CONFIRMED.</Text>
      <Text style={styles.message}>Thanks for your order. We&apos;re getting it ready now.</Text>
      <Text style={styles.orderNumber}>ORDER {orderNumber}</Text>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>DELIVERY DETAILS</Text>
        <View style={styles.detailRow}><Feather name="clock" size={20} color={GOPUFF_COLORS.action} /><Text style={styles.detailText}>Arriving in about 12 mins</Text></View>
        <View style={styles.detailRow}><Feather name="map-pin" size={20} color={GOPUFF_COLORS.action} /><Text style={styles.detailText}>{locationName}</Text></View>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>YOUR ORDER</Text>
        {items.map((item) => (
          <View key={item.product.id} style={styles.itemRow}>
            <Text style={styles.quantity}>{item.quantity}x</Text>
            <Text style={styles.itemName} numberOfLines={1}>{item.product.name.replace(/\n/g, ' ')}</Text>
            <Image source={item.product.imageSource} style={styles.itemImage} resizeMode="contain" />
            <Text style={styles.price}>${(item.product.price * item.quantity).toFixed(2)}</Text>
          </View>
        ))}
        <View style={styles.divider} />
        <View style={styles.totalRow}><Text style={styles.totalLabel}>TOTAL</Text><Text style={styles.total}>${total.toFixed(2)}</Text></View>
      </View>
      <TouchableOpacity style={styles.primaryButton} onPress={onTrack}><Text style={styles.buttonText}>TRACK ORDER</Text></TouchableOpacity>
      <TouchableOpacity style={styles.secondaryButton} onPress={onContinue}><Text style={styles.secondaryText}>CONTINUE SHOPPING</Text></TouchableOpacity>
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: GOPUFF_COLORS.white },
  content: { width: '100%', maxWidth: 680, alignSelf: 'center', padding: 34, paddingTop: 30, paddingBottom: 48, alignItems: 'center' },
  successIcon: { width: 72, height: 72, borderRadius: 36, backgroundColor: GOPUFF_COLORS.success, alignItems: 'center', justifyContent: 'center', marginBottom: GOPUFF_SPACING.lg },
  title: { fontFamily: GOPUFF_FONTS.family, fontSize: 30, fontWeight: '900', fontStyle: 'italic', color: GOPUFF_COLORS.black, textAlign: 'center', letterSpacing: -0.5 },
  message: { fontFamily: GOPUFF_FONTS.regular, fontSize: 17, color: GOPUFF_COLORS.grayText, textAlign: 'center', marginTop: GOPUFF_SPACING.sm },
  orderNumber: { fontFamily: GOPUFF_FONTS.black, fontSize: 14, fontWeight: '900', color: GOPUFF_COLORS.action, marginTop: GOPUFF_SPACING.md },
  card: { width: '100%', backgroundColor: GOPUFF_COLORS.surface, borderBottomWidth: 1, borderBottomColor: GOPUFF_COLORS.borderLight, paddingVertical: GOPUFF_SPACING.xl, marginTop: GOPUFF_SPACING.lg },
  cardTitle: { fontFamily: GOPUFF_FONTS.family, fontSize: 22, fontWeight: '900', fontStyle: 'italic', color: GOPUFF_COLORS.black, marginBottom: GOPUFF_SPACING.lg },
  detailRow: { flexDirection: 'row', alignItems: 'center', gap: GOPUFF_SPACING.md, marginTop: GOPUFF_SPACING.sm },
  detailText: { fontFamily: GOPUFF_FONTS.regular, fontSize: 16, color: GOPUFF_COLORS.dark },
  itemRow: { flexDirection: 'row', alignItems: 'center', gap: GOPUFF_SPACING.sm, marginBottom: GOPUFF_SPACING.md },
  quantity: { width: 28, fontFamily: GOPUFF_FONTS.black, fontWeight: '900', color: GOPUFF_COLORS.action },
  itemName: { flex: 1, fontFamily: GOPUFF_FONTS.regular, fontSize: 15, color: GOPUFF_COLORS.dark },
  itemImage: { width: 42, height: 42, marginHorizontal: GOPUFF_SPACING.xs },
  price: { fontFamily: GOPUFF_FONTS.bold, fontWeight: '800', color: GOPUFF_COLORS.black },
  divider: { height: 1, backgroundColor: GOPUFF_COLORS.borderLight, marginVertical: GOPUFF_SPACING.md },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between' },
  totalLabel: { fontFamily: GOPUFF_FONTS.family, fontSize: 20, fontWeight: '900', fontStyle: 'italic' },
  total: { fontFamily: GOPUFF_FONTS.black, fontSize: 22, fontWeight: '900', color: GOPUFF_COLORS.action },
  primaryButton: { width: '100%', height: GOPUFF_SIZES.controlHeight, borderRadius: GOPUFF_RADII.pill, backgroundColor: GOPUFF_COLORS.action, alignItems: 'center', justifyContent: 'center', marginTop: GOPUFF_SPACING.xl },
  buttonText: { fontFamily: GOPUFF_FONTS.black, fontSize: 16, fontWeight: '900', fontStyle: 'italic', color: GOPUFF_COLORS.white },
  secondaryButton: { height: GOPUFF_SIZES.controlHeight, width: '100%', borderRadius: GOPUFF_RADII.pill, borderWidth: 2, borderColor: GOPUFF_COLORS.action, alignItems: 'center', justifyContent: 'center', marginTop: GOPUFF_SPACING.md },
  secondaryText: { fontFamily: GOPUFF_FONTS.family, fontSize: 14, fontWeight: '900', fontStyle: 'italic', color: GOPUFF_COLORS.action },
});
