import React, { useState } from 'react';
import {
  Modal,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import {
  GOPUFF_COLORS,
  GOPUFF_FONTS,
  GOPUFF_RADII,
  GOPUFF_SHADOWS,
  GOPUFF_SIZES,
  GOPUFF_SPACING,
} from '../constants/theme';

const APP_LOGO = require('../../assets/logo/now now logo.png');

interface AuthModalProps {
  visible: boolean;
  onClose: () => void;
  onAuthenticated: (profile: { name: string; email: string }) => void;
}

type AuthMode = 'signIn' | 'signUp';

export const AuthModal: React.FC<AuthModalProps> = ({ visible, onClose, onAuthenticated }) => {
  const { width } = useWindowDimensions();
  const isMobile = width < GOPUFF_SIZES.mobileBreakpoint;
  const [mode, setMode] = useState<AuthMode>('signIn');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const resetFeedback = () => {
    setError('');
    setSubmitted(false);
  };

  const changeMode = (nextMode: AuthMode) => {
    setMode(nextMode);
    setPassword('');
    resetFeedback();
  };

  const handleSubmit = () => {
    if (mode === 'signUp' && !name.trim()) {
      setError('Enter your name to create an account.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    setError('');
    setSubmitted(true);
    onAuthenticated({
      name: name.trim() || email.split('@')[0],
      email: email.trim(),
    });
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.backdrop} onPress={onClose} activeOpacity={1} />
        <View style={[styles.card, isMobile && styles.cardMobile]}>
          <TouchableOpacity
            accessibilityLabel="Close sign in modal"
            onPress={onClose}
            style={styles.closeButton}
          >
            <Feather name="x" size={26} color={GOPUFF_COLORS.black} />
          </TouchableOpacity>

          <ScrollView
            contentContainerStyle={styles.content}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <Image source={APP_LOGO} style={styles.logo} resizeMode="cover" />
            <Text style={styles.title}>{mode === 'signIn' ? 'WELCOME BACK.' : 'JOIN NOW NOW.'}</Text>
            <Text style={styles.description}>
              {mode === 'signIn'
                ? 'Sign in to access your account and check out faster.'
                : 'Create an account for faster checkout and order updates.'}
            </Text>

            <View style={styles.modeSwitch}>
              <TouchableOpacity
                onPress={() => changeMode('signIn')}
                style={[styles.modeButton, mode === 'signIn' && styles.modeButtonActive]}
              >
                <Text style={[styles.modeText, mode === 'signIn' && styles.modeTextActive]}>
                  SIGN IN
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => changeMode('signUp')}
                style={[styles.modeButton, mode === 'signUp' && styles.modeButtonActive]}
              >
                <Text style={[styles.modeText, mode === 'signUp' && styles.modeTextActive]}>
                  SIGN UP
                </Text>
              </TouchableOpacity>
            </View>

            {mode === 'signUp' && (
              <TextInput
                value={name}
                onChangeText={(value) => {
                  setName(value);
                  resetFeedback();
                }}
                placeholder="Full name"
                placeholderTextColor={GOPUFF_COLORS.placeholder}
                style={styles.input}
                autoCapitalize="words"
              />
            )}
            <TextInput
              value={email}
              onChangeText={(value) => {
                setEmail(value);
                resetFeedback();
              }}
              placeholder="Email address"
              placeholderTextColor={GOPUFF_COLORS.placeholder}
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
            <TextInput
              value={password}
              onChangeText={(value) => {
                setPassword(value);
                resetFeedback();
              }}
              placeholder="Password"
              placeholderTextColor={GOPUFF_COLORS.placeholder}
              style={styles.input}
              secureTextEntry
            />

            {!!error && <Text style={styles.errorText}>{error}</Text>}
            {submitted && (
              <Text style={styles.successText}>
                {mode === 'signIn' ? 'You are signed in.' : 'Your account has been created.'}
              </Text>
            )}

            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleSubmit}
              accessibilityLabel={mode === 'signIn' ? 'Submit sign in' : 'Submit sign up'}
            >
              <Text style={styles.primaryButtonText}>
                {mode === 'signIn' ? 'SIGN IN' : 'CREATE ACCOUNT'}
              </Text>
            </TouchableOpacity>

            <Text style={styles.orText}>OR</Text>
            <TouchableOpacity
              style={styles.appleButton}
              onPress={() => {
                setSubmitted(true);
                onAuthenticated({ name: 'Apple customer', email: 'apple@private.relay' });
              }}
            >
              <Ionicons name="logo-apple" size={21} color={GOPUFF_COLORS.black} />
              <Text style={styles.appleButtonText}>CONTINUE WITH APPLE</Text>
            </TouchableOpacity>
            <Text style={styles.terms}>
              By continuing, you agree to our <Text style={styles.underlined}>Terms</Text> and{' '}
              <Text style={styles.underlined}>Privacy Policy</Text>.
            </Text>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: GOPUFF_COLORS.overlay,
  },
  card: {
    width: 480,
    maxWidth: 'calc(100% - 32px)' as any,
    maxHeight: 'calc(100% - 40px)' as any,
    backgroundColor: GOPUFF_COLORS.surface,
    borderRadius: GOPUFF_RADII.lg,
    position: 'relative',
    ...GOPUFF_SHADOWS.modal,
    ...Platform.select({
      web: { boxShadow: '0 10px 32px rgba(0, 0, 0, 0.28)' } as any,
    }),
  },
  cardMobile: {
    width: 'calc(100% - 28px)' as any,
    maxHeight: 'calc(100% - 28px)' as any,
  },
  content: {
    paddingHorizontal: GOPUFF_SPACING.xl,
    paddingTop: 42,
    paddingBottom: GOPUFF_SPACING.lg,
  },
  closeButton: {
    position: 'absolute',
    top: GOPUFF_SPACING.md,
    right: GOPUFF_SPACING.lg,
    padding: GOPUFF_SPACING.xs,
    zIndex: 2,
  },
  logo: {
    width: 190,
    height: 52,
    alignSelf: 'center',
    marginBottom: GOPUFF_SPACING.md,
  },
  title: {
    fontFamily: GOPUFF_FONTS.black,
    fontSize: 26,
    lineHeight: 30,
    fontWeight: '900',
    fontStyle: 'italic',
    color: GOPUFF_COLORS.black,
    textAlign: 'center',
  },
  description: {
    fontFamily: GOPUFF_FONTS.regular,
    fontSize: 15,
    lineHeight: 21,
    color: GOPUFF_COLORS.grayText,
    textAlign: 'center',
    marginTop: GOPUFF_SPACING.sm,
    marginBottom: GOPUFF_SPACING.lg,
  },
  modeSwitch: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: GOPUFF_COLORS.borderLight,
    marginBottom: GOPUFF_SPACING.lg,
  },
  modeButton: {
    flex: 1,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modeButtonActive: {
    borderBottomWidth: 3,
    borderBottomColor: GOPUFF_COLORS.action,
  },
  modeText: {
    fontFamily: GOPUFF_FONTS.bold,
    fontSize: 13,
    color: GOPUFF_COLORS.mutedText,
  },
  modeTextActive: {
    color: GOPUFF_COLORS.action,
  },
  input: {
    height: GOPUFF_SIZES.compactControlHeight,
    borderWidth: 1,
    borderColor: GOPUFF_COLORS.border,
    borderRadius: GOPUFF_RADII.sm,
    paddingHorizontal: GOPUFF_SPACING.md,
    marginBottom: GOPUFF_SPACING.md,
    fontFamily: GOPUFF_FONTS.regular,
    fontSize: 16,
    color: GOPUFF_COLORS.black,
    backgroundColor: GOPUFF_COLORS.background,
  },
  errorText: {
    fontFamily: GOPUFF_FONTS.regular,
    fontSize: 13,
    color: '#B42318',
    marginBottom: GOPUFF_SPACING.md,
  },
  successText: {
    fontFamily: GOPUFF_FONTS.bold,
    fontSize: 13,
    color: GOPUFF_COLORS.success,
    marginBottom: GOPUFF_SPACING.md,
  },
  primaryButton: {
    height: GOPUFF_SIZES.controlHeight,
    borderRadius: GOPUFF_RADII.pill,
    backgroundColor: GOPUFF_COLORS.action,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    fontFamily: GOPUFF_FONTS.black,
    fontSize: 16,
    fontStyle: 'italic',
    color: GOPUFF_COLORS.white,
  },
  orText: {
    fontFamily: GOPUFF_FONTS.bold,
    fontSize: 13,
    color: GOPUFF_COLORS.grayText,
    textAlign: 'center',
    marginVertical: GOPUFF_SPACING.sm,
  },
  appleButton: {
    height: GOPUFF_SIZES.controlHeight,
    borderRadius: GOPUFF_RADII.pill,
    borderWidth: 1.5,
    borderColor: GOPUFF_COLORS.borderDark,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: GOPUFF_SPACING.md,
  },
  appleButtonText: {
    fontFamily: GOPUFF_FONTS.bold,
    fontSize: 14,
    color: GOPUFF_COLORS.black,
  },
  terms: {
    fontFamily: GOPUFF_FONTS.regular,
    fontSize: 11,
    lineHeight: 15,
    color: GOPUFF_COLORS.mutedText,
    textAlign: 'center',
    marginTop: GOPUFF_SPACING.lg,
  },
  underlined: {
    textDecorationLine: 'underline',
  },
});
