import React, { useState } from 'react';
import {
  Platform,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { GOPUFF_FONTS, GOPUFF_SIZES } from '../constants/theme';

const APP_LOGO = require('../../assets/logo/now now logo.png');

interface SiteFooterProps {
  locationName: string;
  onSignInPress: () => void;
  onAccountPress: () => void;
  onSupportPress: () => void;
  onLegalPress: (title: string) => void;
}

const CITIES = ['London', 'Sheffield', 'Sunderland', 'Leeds', 'Derby', 'Coventry', 'Bristol', 'Cambridge'];

export const SiteFooter: React.FC<SiteFooterProps> = ({
  locationName,
  onSignInPress,
  onAccountPress,
  onSupportPress,
  onLegalPress,
}) => {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+44');

  return (
    <View style={styles.footer}>
      <View style={[styles.intro, isMobile && styles.introMobile]}>
        <Image source={APP_LOGO} style={styles.logo} resizeMode="cover" />
        <Text style={[styles.description, isMobile && styles.descriptionMobile]}>
          Now Now delivers groceries, snacks, alcohol, household essentials and more in just 15 minutes.
        </Text>
        <Text style={[styles.prompt, isMobile && styles.promptMobile]}>
          LET&apos;S GET MOVING. DROP YOUR MOBILE NUMBER TO START YOUR ORDER OR PICK UP WHERE YOU LEFT OFF.
        </Text>
        <View style={[styles.signInRow, isMobile && styles.signInRowMobile]}>
          <View style={[styles.phoneInput, isMobile && styles.phoneInputMobile]}>
            <Feather name="phone" size={24} color="#111111" />
            <TouchableOpacity
              style={styles.countryButton}
              onPress={() => setCountryCode(countryCode === '+44' ? '+1' : '+44')}
            >
              <Text style={styles.countryCode}>{countryCode}</Text>
              <Feather name="chevron-down" size={18} color="#111111" />
            </TouchableOpacity>
            <TextInput
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              placeholder="Mobile number"
              placeholderTextColor="#4B5563"
              keyboardType="phone-pad"
              style={styles.phoneTextInput}
            />
          </View>
          <TouchableOpacity style={[styles.signInCta, isMobile && styles.signInCtaMobile]} onPress={onSignInPress}>
            <Text style={styles.signInCtaText}>SIGN IN / SIGN UP</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={[styles.serviceBlock, isMobile && styles.serviceBlockMobile]}>
        <Text style={styles.serviceText}>
          Now Now delivers to over 1,000 cities across the United States (US) and United Kingdom (UK). Major cities include:{' '}
          {CITIES.map((city, index) => (
            <Text
              key={city}
              style={styles.link}
              onPress={onSupportPress}
            >
              {city}{index < CITIES.length - 1 ? ', ' : '.'}
            </Text>
          ))}
        </Text>
      </View>

      <View style={[styles.legalRow, isMobile && styles.legalRowMobile]}>
        <Text style={styles.copyright}>© 2026 GOBRANDS, INC.</Text>
        <TouchableOpacity onPress={onAccountPress}>
          <Text style={styles.legalLink}>My Account</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onSupportPress}>
          <Text style={styles.legalLink}>Help & Support</Text>
        </TouchableOpacity>
        {['Privacy Notice', 'Terms & Conditions', 'Do Not Sell My Personal Information'].map((label) => (
          <TouchableOpacity key={label} onPress={() => onLegalPress(label)}>
            <Text style={styles.legalLink}>{label}</Text>
          </TouchableOpacity>
        ))}
        <Text style={styles.location}>Serving {locationName}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#F8F8F8',
    marginTop: 28,
  },
  intro: {
    paddingHorizontal: 48,
    paddingTop: 72,
    paddingBottom: 46,
  },
  introMobile: {
    paddingHorizontal: 20,
    paddingTop: 44,
    paddingBottom: 34,
  },
  logo: {
    width: 190,
    height: 52,
  },
  description: {
    fontFamily: GOPUFF_FONTS.family,
    fontSize: 21,
    lineHeight: 29,
    color: '#111111',
    marginTop: 18,
  },
  descriptionMobile: {
    fontSize: 16,
    lineHeight: 22,
    marginTop: 14,
  },
  prompt: {
    fontFamily: GOPUFF_FONTS.family,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '900',
    fontStyle: 'italic',
    color: '#111111',
    marginTop: 48,
    marginBottom: 30,
  },
  promptMobile: {
    fontSize: 14,
    lineHeight: 20,
    marginTop: 34,
    marginBottom: 20,
  },
  signInRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 36,
  },
  signInRowMobile: {
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: 14,
  },
  phoneInput: {
    height: 74,
    flex: 0.72,
    minWidth: 300,
    borderWidth: 1,
    borderColor: '#8B8B8B',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    gap: 16,
  },
  phoneInputMobile: {
    width: '100%',
    minWidth: 0,
    height: GOPUFF_SIZES.largeControlHeight,
  },
  countryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  countryCode: {
    fontFamily: GOPUFF_FONTS.family,
    fontSize: 18,
    color: '#111111',
  },
  phoneTextInput: {
    flex: 1,
    fontFamily: GOPUFF_FONTS.family,
    fontSize: 18,
    color: '#111111',
    paddingVertical: 0,
    ...Platform.select({ web: { outlineStyle: 'none' as any } }),
  },
  signInCta: {
    flex: 0.5,
    minWidth: 280,
    height: 74,
    borderRadius: 40,
    backgroundColor: '#1717F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signInCtaMobile: {
    width: '100%',
    minWidth: 0,
    height: GOPUFF_SIZES.largeControlHeight,
  },
  signInCtaText: {
    fontFamily: GOPUFF_FONTS.family,
    fontSize: 18,
    fontWeight: '900',
    fontStyle: 'italic',
    color: '#FFFFFF',
  },
  serviceBlock: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#D5D5D5',
    paddingHorizontal: 48,
    paddingVertical: 34,
  },
  serviceBlockMobile: {
    paddingHorizontal: 20,
    paddingVertical: 26,
  },
  serviceText: {
    fontFamily: GOPUFF_FONTS.family,
    fontSize: 15,
    lineHeight: 22,
    color: '#64748B',
  },
  link: {
    textDecorationLine: 'underline',
  },
  legalRow: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#D5D5D5',
    paddingHorizontal: 48,
    paddingVertical: 34,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 36,
    flexWrap: 'wrap',
  },
  legalRowMobile: {
    paddingHorizontal: 20,
    gap: 18,
    alignItems: 'flex-start',
    flexDirection: 'column',
  },
  copyright: {
    fontFamily: GOPUFF_FONTS.family,
    fontSize: 15,
    fontWeight: '900',
    fontStyle: 'italic',
    color: '#64748B',
  },
  legalLink: {
    fontFamily: GOPUFF_FONTS.family,
    fontSize: 15,
    color: '#64748B',
    textDecorationLine: 'underline',
  },
  location: {
    fontFamily: GOPUFF_FONTS.family,
    fontSize: 13,
    color: '#64748B',
    marginLeft: 'auto',
  },
});
