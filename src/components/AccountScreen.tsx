import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { GOPUFF_COLORS, GOPUFF_FONTS, GOPUFF_RADII, GOPUFF_SIZES, GOPUFF_SPACING } from '../constants/theme';

interface Props {
  signedIn: boolean;
  profile: { name: string; email: string } | null;
  onBack: () => void;
  onSignIn: () => void;
  onSignOut: () => void;
}

export const AccountScreen: React.FC<Props> = ({ signedIn, profile, onBack, onSignIn, onSignOut }) => {
  const { width } = useWindowDimensions();
  const isMobile = width < GOPUFF_SIZES.desktopBreakpoint;

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={[styles.content, isMobile && styles.contentMobile]} showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.back} onPress={onBack}>
          <Feather name="arrow-left" size={20} color={GOPUFF_COLORS.black} />
          <Text style={styles.backText}>BACK TO SHOPPING</Text>
        </TouchableOpacity>
        <Text style={styles.title}>MY ACCOUNT.</Text>

        <View style={[styles.profileSection, isMobile && styles.profileSectionMobile]}>
          <View style={styles.profileIdentity}>
            <View style={styles.avatar}><Feather name="user" size={28} color={GOPUFF_COLORS.white} /></View>
            <View style={styles.flex}>
              <Text style={styles.cardTitle}>{signedIn ? profile?.name : 'Welcome to Gopuff'}</Text>
              <Text style={styles.body}>{signedIn ? profile?.email : 'Sign in to manage your orders, addresses and preferences.'}</Text>
            </View>
          </View>
          <TouchableOpacity style={[styles.primaryButton, isMobile && styles.primaryButtonMobile]} onPress={signedIn ? onSignOut : onSignIn}>
            <Text style={styles.buttonText}>{signedIn ? 'SIGN OUT' : 'SIGN IN'}</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionHeading}>ORDER HISTORY</Text>
        <View style={styles.emptySection}>
          <View style={styles.emptyIcon}><Feather name="shopping-bag" size={24} color={GOPUFF_COLORS.action} /></View>
          <View style={styles.emptyCopy}>
            <Text style={styles.emptyTitle}>No orders yet</Text>
            <Text style={styles.body}>Your completed orders will appear here.</Text>
          </View>
          <TouchableOpacity style={styles.outlineButton} onPress={onBack}>
            <Text style={styles.outlineText}>START SHOPPING</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionHeading}>ACCOUNT SETTINGS</Text>
        <View style={styles.settingsSection}>
          {[
            { label: 'Saved addresses', icon: 'map-pin' as const },
            { label: 'Payment methods', icon: 'credit-card' as const },
            { label: 'FAM membership', icon: 'star' as const },
          ].map(({ label, icon }) => (
            <TouchableOpacity key={label} style={styles.settingRow}>
              <View style={styles.settingIcon}><Feather name={icon} size={18} color={GOPUFF_COLORS.action} /></View>
              <Text style={styles.settingText}>{label}</Text>
              <Feather name="chevron-right" size={20} color={GOPUFF_COLORS.black} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: GOPUFF_COLORS.white },
  content: { width: '100%', maxWidth: 900, alignSelf: 'center', padding: 34, paddingTop: 26, paddingBottom: 48 },
  contentMobile: { padding: GOPUFF_SPACING.lg, paddingTop: GOPUFF_SPACING.md, paddingBottom: 32 },
  back: { flexDirection: 'row', alignItems: 'center', gap: GOPUFF_SPACING.sm, marginBottom: GOPUFF_SPACING.xl },
  backText: { fontFamily: GOPUFF_FONTS.family, fontSize: 13, color: GOPUFF_COLORS.grayText },
  title: { fontFamily: GOPUFF_FONTS.family, fontSize: 30, fontWeight: '900', fontStyle: 'italic', color: GOPUFF_COLORS.black, marginBottom: GOPUFF_SPACING.xl },
  profileSection: { paddingBottom: GOPUFF_SPACING.xl, borderBottomWidth: 1, borderBottomColor: GOPUFF_COLORS.borderLight, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: GOPUFF_SPACING.lg },
  profileSectionMobile: { flexDirection: 'column', alignItems: 'stretch' },
  profileIdentity: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: GOPUFF_SPACING.md },
  avatar: { width: 56, height: 56, borderRadius: 28, backgroundColor: GOPUFF_COLORS.action, alignItems: 'center', justifyContent: 'center' },
  flex: { flex: 1 },
  cardTitle: { fontFamily: GOPUFF_FONTS.black, fontSize: 18, fontWeight: '900', color: GOPUFF_COLORS.black },
  body: { fontFamily: GOPUFF_FONTS.regular, fontSize: 15, lineHeight: 22, color: GOPUFF_COLORS.grayText, marginTop: GOPUFF_SPACING.xs },
  primaryButton: { height: GOPUFF_SIZES.controlHeight, paddingHorizontal: GOPUFF_SPACING.lg, borderRadius: GOPUFF_RADII.pill, backgroundColor: GOPUFF_COLORS.action, alignItems: 'center', justifyContent: 'center' },
  primaryButtonMobile: { width: '100%' },
  buttonText: { fontFamily: GOPUFF_FONTS.family, fontSize: 13, fontWeight: '900', fontStyle: 'italic', color: GOPUFF_COLORS.white },
  sectionHeading: { fontFamily: GOPUFF_FONTS.family, fontSize: 22, fontWeight: '900', fontStyle: 'italic', color: GOPUFF_COLORS.black, marginTop: GOPUFF_SPACING.xxl, marginBottom: GOPUFF_SPACING.md },
  emptySection: { minHeight: 94, paddingVertical: GOPUFF_SPACING.lg, borderBottomWidth: 1, borderBottomColor: GOPUFF_COLORS.borderLight, flexDirection: 'row', alignItems: 'center', gap: GOPUFF_SPACING.md },
  emptyIcon: { width: 46, height: 46, borderRadius: 23, backgroundColor: GOPUFF_COLORS.infoBackground, alignItems: 'center', justifyContent: 'center' },
  emptyCopy: { flex: 1 },
  emptyTitle: { fontFamily: GOPUFF_FONTS.family, fontSize: 19, fontWeight: '900', fontStyle: 'italic' },
  outlineButton: { height: GOPUFF_SIZES.compactControlHeight, paddingHorizontal: GOPUFF_SPACING.xl, borderRadius: GOPUFF_RADII.pill, borderWidth: 2, borderColor: GOPUFF_COLORS.action, alignItems: 'center', justifyContent: 'center' },
  outlineText: { fontFamily: GOPUFF_FONTS.family, fontSize: 13, fontWeight: '900', fontStyle: 'italic', color: GOPUFF_COLORS.action },
  settingsSection: { borderTopWidth: 1, borderTopColor: GOPUFF_COLORS.borderLight },
  settingRow: { minHeight: 64, paddingVertical: GOPUFF_SPACING.sm, backgroundColor: GOPUFF_COLORS.surface, borderBottomWidth: 1, borderBottomColor: GOPUFF_COLORS.borderLight, flexDirection: 'row', alignItems: 'center', gap: GOPUFF_SPACING.md },
  settingIcon: { width: 34, height: 34, borderRadius: 17, backgroundColor: GOPUFF_COLORS.infoBackground, alignItems: 'center', justifyContent: 'center' },
  settingText: { flex: 1, fontFamily: GOPUFF_FONTS.family, fontSize: 16, fontWeight: '800', color: GOPUFF_COLORS.black },
});
