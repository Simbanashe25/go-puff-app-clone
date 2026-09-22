import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { GOPUFF_COLORS, GOPUFF_FONTS, GOPUFF_RADII, GOPUFF_SIZES, GOPUFF_SPACING } from '../constants/theme';

interface Props { orderNumber: string; locationName: string; onBack: () => void; onSupport: () => void; }

export const OrderTrackingScreen: React.FC<Props> = ({ orderNumber, locationName, onBack, onSupport }) => (
  <View style={styles.screen}>
    <ScrollView contentContainerStyle={styles.content}>
      <TouchableOpacity onPress={onBack} style={styles.back}><Feather name="arrow-left" size={20} color={GOPUFF_COLORS.black} /><Text style={styles.backText}>ORDER CONFIRMATION</Text></TouchableOpacity>
      <Text style={styles.title}>TRACK YOUR ORDER.</Text>
      <Text style={styles.orderNumber}>ORDER {orderNumber}</Text>
      <View style={styles.hero}><Text style={styles.etaLabel}>ESTIMATED ARRIVAL</Text><Text style={styles.eta}>12 MINS</Text><Text style={styles.address}>{locationName}</Text></View>
      <View style={styles.card}>
        <TrackingStep icon="check" title="Order confirmed" detail="We received your order" complete />
        <TrackingStep icon="shopping-bag" title="Picking your items" detail="Your shopper is getting everything together" complete />
        <TrackingStep icon="truck" title="On the way" detail="Your order will be here soon" />
        <TrackingStep icon="home" title="Delivered" detail="Enjoy your order" />
      </View>
      <TouchableOpacity style={styles.supportButton} onPress={onSupport}><Feather name="help-circle" size={20} color={GOPUFF_COLORS.action} /><Text style={styles.supportText}>CONTACT SUPPORT</Text></TouchableOpacity>
    </ScrollView>
  </View>
);

const TrackingStep: React.FC<{ icon: any; title: string; detail: string; complete?: boolean }> = ({ icon, title, detail, complete }) => (
  <View style={styles.step}><View style={[styles.stepIcon, complete && styles.stepComplete]}><Feather name={icon} size={18} color={complete ? GOPUFF_COLORS.white : GOPUFF_COLORS.grayText} /></View><View style={styles.stepCopy}><Text style={styles.stepTitle}>{title}</Text><Text style={styles.stepDetail}>{detail}</Text></View></View>
);

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: GOPUFF_COLORS.white },
  content: { width: '100%', maxWidth: 680, alignSelf: 'center', padding: 34, paddingTop: 30, paddingBottom: 48 },
  back: { flexDirection: 'row', alignItems: 'center', gap: GOPUFF_SPACING.sm, marginBottom: GOPUFF_SPACING.xl },
  backText: { fontFamily: GOPUFF_FONTS.family, fontSize: 13, color: GOPUFF_COLORS.grayText },
  title: { fontFamily: GOPUFF_FONTS.family, fontSize: 30, fontWeight: '900', fontStyle: 'italic', color: GOPUFF_COLORS.black, letterSpacing: -0.5 },
  orderNumber: { fontFamily: GOPUFF_FONTS.black, fontWeight: '900', color: GOPUFF_COLORS.action, marginTop: GOPUFF_SPACING.sm },
  hero: { backgroundColor: GOPUFF_COLORS.infoBackground, borderRadius: GOPUFF_RADII.lg, padding: GOPUFF_SPACING.xl, alignItems: 'center', marginTop: GOPUFF_SPACING.xl },
  etaLabel: { fontFamily: GOPUFF_FONTS.family, fontSize: 14, fontWeight: '900', color: GOPUFF_COLORS.grayText },
  eta: { fontFamily: GOPUFF_FONTS.black, fontSize: 42, fontWeight: '900', fontStyle: 'italic', color: GOPUFF_COLORS.action, marginVertical: GOPUFF_SPACING.sm },
  address: { fontFamily: GOPUFF_FONTS.regular, fontSize: 16, color: GOPUFF_COLORS.dark },
  card: { backgroundColor: GOPUFF_COLORS.surface, borderBottomWidth: 1, borderBottomColor: GOPUFF_COLORS.borderLight, paddingVertical: GOPUFF_SPACING.xl, marginTop: GOPUFF_SPACING.lg },
  step: { flexDirection: 'row', alignItems: 'center', minHeight: 72, gap: GOPUFF_SPACING.md },
  stepIcon: { width: 40, height: 40, borderRadius: 20, borderWidth: 2, borderColor: GOPUFF_COLORS.border, alignItems: 'center', justifyContent: 'center' },
  stepComplete: { backgroundColor: GOPUFF_COLORS.success, borderColor: GOPUFF_COLORS.success },
  stepCopy: { flex: 1 },
  stepTitle: { fontFamily: GOPUFF_FONTS.family, fontSize: 16, fontWeight: '800', color: GOPUFF_COLORS.black },
  stepDetail: { fontFamily: GOPUFF_FONTS.regular, fontSize: 14, color: GOPUFF_COLORS.grayText, marginTop: 2 },
  supportButton: { height: GOPUFF_SIZES.controlHeight, borderRadius: GOPUFF_RADII.pill, borderWidth: 2, borderColor: GOPUFF_COLORS.action, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: GOPUFF_SPACING.sm, marginTop: GOPUFF_SPACING.xl },
  supportText: { fontFamily: GOPUFF_FONTS.family, color: GOPUFF_COLORS.action, fontSize: 14, fontWeight: '900', fontStyle: 'italic' },
});
