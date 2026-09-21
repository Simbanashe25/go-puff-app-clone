import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { GOPUFF_COLORS, GOPUFF_FONTS, GOPUFF_RADII, GOPUFF_SHADOWS, GOPUFF_SPACING } from '../constants/theme';

interface Props {
  signedIn: boolean;
  profile: { name: string; email: string } | null;
  onBack: () => void;
  onSignIn: () => void;
  onSignOut: () => void;
}

export const AccountScreen: React.FC<Props> = ({ signedIn, profile, onBack, onSignIn, onSignOut }) => (
  <View style={styles.screen}>
    <ScrollView contentContainerStyle={styles.content}>
      <TouchableOpacity style={styles.back} onPress={onBack}><Feather name="arrow-left" size={20} color={GOPUFF_COLORS.black} /><Text style={styles.backText}>BACK TO SHOPPING</Text></TouchableOpacity>
      <Text style={styles.title}>MY ACCOUNT.</Text>
      <View style={styles.profileCard}>
        <View style={styles.avatar}><Feather name="user" size={28} color={GOPUFF_COLORS.white} /></View>
        <View style={styles.flex}>
          <Text style={styles.cardTitle}>{signedIn ? profile?.name : 'Welcome to Gopuff'}</Text>
          <Text style={styles.body}>{signedIn ? profile?.email : 'Sign in to manage your orders, addresses and preferences.'}</Text>
        </View>
        <TouchableOpacity style={styles.primaryButton} onPress={signedIn ? onSignOut : onSignIn}>
          <Text style={styles.buttonText}>{signedIn ? 'SIGN OUT' : 'SIGN IN'}</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.sectionHeading}>ORDER HISTORY</Text>
      <View style={styles.emptyCard}><Feather name="shopping-bag" size={30} color={GOPUFF_COLORS.action} /><Text style={styles.emptyTitle}>No orders yet</Text><Text style={styles.body}>Your completed orders will appear here.</Text><TouchableOpacity style={styles.outlineButton} onPress={onBack}><Text style={styles.outlineText}>START SHOPPING</Text></TouchableOpacity></View>
      <Text style={styles.sectionHeading}>ACCOUNT SETTINGS</Text>
      {['Saved addresses', 'Payment methods', 'FAM membership'].map((label) => <TouchableOpacity key={label} style={styles.settingRow}><Text style={styles.settingText}>{label}</Text><Feather name="chevron-right" size={20} color={GOPUFF_COLORS.black} /></TouchableOpacity>)}
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: GOPUFF_COLORS.pageBackground },
  content: { width: '100%', maxWidth: 900, alignSelf: 'center', padding: GOPUFF_SPACING.xxl },
  back: { flexDirection: 'row', alignItems: 'center', gap: GOPUFF_SPACING.sm, marginBottom: GOPUFF_SPACING.xl },
  backText: { fontFamily: GOPUFF_FONTS.black, fontSize: 13, fontWeight: '900', color: GOPUFF_COLORS.black },
  title: { fontFamily: GOPUFF_FONTS.black, fontSize: 38, fontWeight: '900', fontStyle: 'italic', color: GOPUFF_COLORS.black, marginBottom: GOPUFF_SPACING.xl },
  profileCard: { backgroundColor: GOPUFF_COLORS.surface, borderRadius: GOPUFF_RADII.lg, padding: GOPUFF_SPACING.xl, flexDirection: 'row', alignItems: 'center', gap: GOPUFF_SPACING.md, ...GOPUFF_SHADOWS.card },
  avatar: { width: 56, height: 56, borderRadius: 28, backgroundColor: GOPUFF_COLORS.action, alignItems: 'center', justifyContent: 'center' },
  flex: { flex: 1 },
  cardTitle: { fontFamily: GOPUFF_FONTS.black, fontSize: 18, fontWeight: '900', color: GOPUFF_COLORS.black },
  body: { fontFamily: GOPUFF_FONTS.regular, fontSize: 15, lineHeight: 22, color: GOPUFF_COLORS.grayText, marginTop: GOPUFF_SPACING.xs },
  primaryButton: { height: GOPUFF_SPACING.xxl, paddingHorizontal: GOPUFF_SPACING.lg, borderRadius: GOPUFF_RADII.pill, backgroundColor: GOPUFF_COLORS.action, alignItems: 'center', justifyContent: 'center' },
  buttonText: { fontFamily: GOPUFF_FONTS.black, fontSize: 13, fontWeight: '900', fontStyle: 'italic', color: GOPUFF_COLORS.white },
  sectionHeading: { fontFamily: GOPUFF_FONTS.black, fontSize: 20, fontWeight: '900', fontStyle: 'italic', color: GOPUFF_COLORS.black, marginTop: GOPUFF_SPACING.xxl, marginBottom: GOPUFF_SPACING.md },
  emptyCard: { backgroundColor: GOPUFF_COLORS.surface, borderRadius: GOPUFF_RADII.lg, padding: GOPUFF_SPACING.xxl, alignItems: 'center', ...GOPUFF_SHADOWS.card },
  emptyTitle: { fontFamily: GOPUFF_FONTS.black, fontSize: 20, fontWeight: '900', marginTop: GOPUFF_SPACING.md },
  outlineButton: { height: 48, paddingHorizontal: GOPUFF_SPACING.xl, borderRadius: GOPUFF_RADII.pill, borderWidth: 2, borderColor: GOPUFF_COLORS.action, alignItems: 'center', justifyContent: 'center', marginTop: GOPUFF_SPACING.lg },
  outlineText: { fontFamily: GOPUFF_FONTS.black, fontSize: 13, fontWeight: '900', color: GOPUFF_COLORS.action },
  settingRow: { minHeight: 58, paddingHorizontal: GOPUFF_SPACING.lg, backgroundColor: GOPUFF_COLORS.surface, borderBottomWidth: 1, borderBottomColor: GOPUFF_COLORS.borderLight, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  settingText: { fontFamily: GOPUFF_FONTS.bold, fontSize: 16, fontWeight: '800', color: GOPUFF_COLORS.black },
});
