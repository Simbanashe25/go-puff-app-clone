import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { GOPUFF_COLORS, GOPUFF_FONTS, GOPUFF_RADII, GOPUFF_SHADOWS, GOPUFF_SPACING } from '../constants/theme';

interface Props { onBack: () => void; }
const topics = ['Where is my order?', 'Missing or incorrect items', 'Delivery issue', 'Payment problem', 'Refunds and returns'];

export const SupportScreen: React.FC<Props> = ({ onBack }) => (
  <View style={styles.screen}><ScrollView contentContainerStyle={styles.content}>
    <TouchableOpacity style={styles.back} onPress={onBack}><Feather name="arrow-left" size={20} color={GOPUFF_COLORS.black} /><Text style={styles.backText}>BACK TO SHOPPING</Text></TouchableOpacity>
    <Text style={styles.title}>HOW CAN WE HELP?</Text>
    <Text style={styles.intro}>Find answers quickly or contact our support team.</Text>
    <View style={styles.contactCard}><Feather name="message-circle" size={28} color={GOPUFF_COLORS.action} /><View style={styles.flex}><Text style={styles.cardTitle}>CONTACT SUPPORT</Text><Text style={styles.body}>Our team is here to help with your order.</Text></View><TouchableOpacity style={styles.primaryButton}><Text style={styles.buttonText}>MESSAGE US</Text></TouchableOpacity></View>
    <Text style={styles.sectionHeading}>POPULAR TOPICS</Text>
    <View style={styles.topicCard}>{topics.map((topic) => <TouchableOpacity key={topic} style={styles.topicRow}><Text style={styles.topicText}>{topic}</Text><Feather name="chevron-right" size={20} color={GOPUFF_COLORS.black} /></TouchableOpacity>)}</View>
  </ScrollView></View>
);

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: GOPUFF_COLORS.pageBackground },
  content: { width: '100%', maxWidth: 900, alignSelf: 'center', padding: GOPUFF_SPACING.xxl },
  back: { flexDirection: 'row', alignItems: 'center', gap: GOPUFF_SPACING.sm, marginBottom: GOPUFF_SPACING.xl },
  backText: { fontFamily: GOPUFF_FONTS.black, fontSize: 13, fontWeight: '900' },
  title: { fontFamily: GOPUFF_FONTS.black, fontSize: 38, fontWeight: '900', fontStyle: 'italic', color: GOPUFF_COLORS.black },
  intro: { fontFamily: GOPUFF_FONTS.regular, fontSize: 17, color: GOPUFF_COLORS.grayText, marginTop: GOPUFF_SPACING.sm },
  contactCard: { backgroundColor: GOPUFF_COLORS.infoBackground, borderRadius: GOPUFF_RADII.lg, padding: GOPUFF_SPACING.xl, flexDirection: 'row', alignItems: 'center', gap: GOPUFF_SPACING.md, marginTop: GOPUFF_SPACING.xl, ...GOPUFF_SHADOWS.card },
  flex: { flex: 1 },
  cardTitle: { fontFamily: GOPUFF_FONTS.black, fontSize: 18, fontWeight: '900' },
  body: { fontFamily: GOPUFF_FONTS.regular, fontSize: 15, lineHeight: 22, color: GOPUFF_COLORS.grayText, marginTop: GOPUFF_SPACING.xs },
  primaryButton: { height: 48, paddingHorizontal: GOPUFF_SPACING.lg, borderRadius: GOPUFF_RADII.pill, backgroundColor: GOPUFF_COLORS.action, alignItems: 'center', justifyContent: 'center' },
  buttonText: { fontFamily: GOPUFF_FONTS.black, fontSize: 13, fontWeight: '900', fontStyle: 'italic', color: GOPUFF_COLORS.white },
  sectionHeading: { fontFamily: GOPUFF_FONTS.black, fontSize: 20, fontWeight: '900', fontStyle: 'italic', marginTop: GOPUFF_SPACING.xxl, marginBottom: GOPUFF_SPACING.md },
  topicCard: { backgroundColor: GOPUFF_COLORS.surface, borderRadius: GOPUFF_RADII.lg, paddingHorizontal: GOPUFF_SPACING.lg, ...GOPUFF_SHADOWS.card },
  topicRow: { minHeight: 58, borderBottomWidth: 1, borderBottomColor: GOPUFF_COLORS.borderLight, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  topicText: { fontFamily: GOPUFF_FONTS.bold, fontSize: 16, fontWeight: '800' },
});
