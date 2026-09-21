import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { GOPUFF_COLORS, GOPUFF_FONTS, GOPUFF_SPACING } from '../constants/theme';

interface Props { title: string; onBack: () => void; }
const sections = ['Information we collect', 'How we use information', 'Your choices and rights', 'Contact us'];

export const LegalScreen: React.FC<Props> = ({ title, onBack }) => (
  <View style={styles.screen}><ScrollView contentContainerStyle={styles.content}>
    <TouchableOpacity style={styles.back} onPress={onBack}><Feather name="arrow-left" size={20} color={GOPUFF_COLORS.black} /><Text style={styles.backText}>BACK TO SHOPPING</Text></TouchableOpacity>
    <Text style={styles.title}>{title.toUpperCase()}.</Text>
    <Text style={styles.updated}>Last updated: September 2026</Text>
    {sections.map((section, index) => <View key={section} style={styles.section}><Text style={styles.heading}>{section}</Text><Text style={styles.body}>{index === 0 ? 'We collect information you provide when you create an account, place an order, choose a delivery location or contact support.' : index === 1 ? 'We use information to process orders, provide delivery services, improve the app and communicate important updates.' : index === 2 ? 'You can review, update or request deletion of your personal information by contacting support.' : 'For questions about this policy, please contact the Gopuff support team through the Help & Support page.'}</Text></View>)}
  </ScrollView></View>
);

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: GOPUFF_COLORS.pageBackground },
  content: { width: '100%', maxWidth: 900, alignSelf: 'center', padding: GOPUFF_SPACING.xxl },
  back: { flexDirection: 'row', alignItems: 'center', gap: GOPUFF_SPACING.sm, marginBottom: GOPUFF_SPACING.xl },
  backText: { fontFamily: GOPUFF_FONTS.black, fontSize: 13, fontWeight: '900' },
  title: { fontFamily: GOPUFF_FONTS.black, fontSize: 38, fontWeight: '900', fontStyle: 'italic', color: GOPUFF_COLORS.black },
  updated: { fontFamily: GOPUFF_FONTS.regular, fontSize: 14, color: GOPUFF_COLORS.grayText, marginTop: GOPUFF_SPACING.sm, marginBottom: GOPUFF_SPACING.xl },
  section: { paddingVertical: GOPUFF_SPACING.xl, borderBottomWidth: 1, borderBottomColor: GOPUFF_COLORS.borderLight },
  heading: { fontFamily: GOPUFF_FONTS.black, fontSize: 20, fontWeight: '900', color: GOPUFF_COLORS.black, marginBottom: GOPUFF_SPACING.sm },
  body: { fontFamily: GOPUFF_FONTS.regular, fontSize: 16, lineHeight: 26, color: GOPUFF_COLORS.grayText },
});
