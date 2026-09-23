import React, { useState } from 'react';
import {
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { GOPUFF_FONTS } from '../constants/theme';

interface GiftModalProps {
  visible: boolean;
  onClose: () => void;
  onRemove: () => void;
}

export const GiftModal: React.FC<GiftModalProps> = ({
  visible,
  onClose,
  onRemove,
}) => {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [message, setMessage] = useState('');
  const [from, setFrom] = useState('');

  const close = () => {
    onClose();
  };

  const saveGift = () => {
    close();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType={isMobile ? 'slide' : 'fade'}
      onRequestClose={close}
    >
      <View style={[styles.overlay, isMobile && styles.overlayMobile]}>
        <TouchableOpacity style={styles.backdrop} onPress={close} activeOpacity={1} />
        <View style={[styles.modalCard, isMobile && styles.modalCardMobile]}>
          <View style={styles.header}>
            <Text style={styles.title}>MAKE THIS ORDER A GIFT.</Text>
            <TouchableOpacity onPress={close} accessibilityLabel="Close gift modal">
              <Feather name="x" size={30} color="#111111" />
            </TouchableOpacity>
          </View>

          <ScrollView
            style={styles.scroll}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.sectionHeading}>
              <Feather name="user" size={28} color="#111111" />
              <Text style={styles.sectionTitle}>Who's the gift for?</Text>
            </View>
            <Text style={styles.description}>
              Please provide contact information for the person who will receive this gift. We use this information to send tracking updates for your gift.
            </Text>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Name"
              placeholderTextColor="#666666"
              style={styles.input}
            />
            <View style={styles.phoneInput}>
              <Text style={styles.countryCode}>+44⌄</Text>
              <TextInput
                value={mobile}
                onChangeText={setMobile}
                placeholder="Mobile number"
                placeholderTextColor="#666666"
                keyboardType="phone-pad"
                style={styles.phoneTextInput}
              />
            </View>
            <View style={[styles.sectionHeading, styles.messageHeading]}>
              <Feather name="message-circle" size={28} color="#111111" />
              <Text style={styles.sectionTitle}>Include a special message</Text>
            </View>
            <TextInput
              value={message}
              onChangeText={(value) => setMessage(value.slice(0, 120))}
              placeholder="Gift Message"
              placeholderTextColor="#666666"
              multiline
              textAlignVertical="top"
              style={styles.messageInput}
            />
            <Text style={styles.characterCount}>{message.length}/120 characters</Text>
            <TextInput
              value={from}
              onChangeText={setFrom}
              placeholder="From*"
              placeholderTextColor="#666666"
              style={styles.input}
            />
            <TouchableOpacity onPress={onRemove} style={styles.removeLink}>
              <Text style={styles.removeText}>Don't gift this order</Text>
            </TouchableOpacity>
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={saveGift}
            >
              <Text style={styles.saveText}>SAVE</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onRemove} style={styles.removeButton}>
              <Text style={styles.removeButtonText}>REMOVE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  overlayMobile: { justifyContent: 'flex-end' },
  backdrop: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.68)' },
  modalCard: {
    width: 720,
    maxWidth: 'calc(100% - 28px)' as any,
    maxHeight: '86%',
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    overflow: 'hidden',
    ...Platform.select({ web: { boxShadow: '0 10px 32px rgba(0,0,0,0.28)' } as any }),
  },
  modalCardMobile: {
    width: '100%',
    maxWidth: '100%',
    maxHeight: '90%',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
  },
  header: {
    minHeight: 78,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontFamily: GOPUFF_FONTS.family,
    fontSize: 29,
    fontWeight: '900',
    fontStyle: 'italic',
  },
  scroll: { maxHeight: 410 },
  scrollContent: { padding: 22 },
  sectionHeading: { flexDirection: 'row', alignItems: 'center', gap: 20, marginBottom: 16 },
  messageHeading: { marginTop: 18 },
  sectionTitle: { fontFamily: GOPUFF_FONTS.family, fontSize: 25, fontWeight: '700', color: '#4B4B4B' },
  description: { fontFamily: GOPUFF_FONTS.family, fontSize: 18, lineHeight: 26, color: '#4B4B4B', marginBottom: 20 },
  input: { height: 68, borderWidth: 1, borderColor: '#AAAAAA', borderRadius: 10, paddingHorizontal: 16, fontFamily: GOPUFF_FONTS.family, fontSize: 22, marginBottom: 20 },
  phoneInput: { height: 68, borderWidth: 1, borderColor: '#AAAAAA', borderRadius: 10, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, marginBottom: 8 },
  countryCode: { fontFamily: GOPUFF_FONTS.family, fontSize: 21, color: '#333333', marginRight: 14 },
  phoneTextInput: { flex: 1, fontFamily: GOPUFF_FONTS.family, fontSize: 22 },
  messageInput: { minHeight: 200, borderWidth: 1, borderColor: '#AAAAAA', borderRadius: 10, padding: 16, fontFamily: GOPUFF_FONTS.family, fontSize: 21 },
  characterCount: { fontFamily: GOPUFF_FONTS.family, fontSize: 15, color: '#555555', marginTop: 8, marginBottom: 34 },
  removeLink: { alignSelf: 'flex-start', marginTop: 6 },
  removeText: { fontFamily: GOPUFF_FONTS.family, fontSize: 19, color: '#555555', textDecorationLine: 'underline' },
  footer: { padding: 16, borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: '#E5E7EB' },
  saveButton: { height: 56, borderRadius: 30, backgroundColor: '#8000FF', alignItems: 'center', justifyContent: 'center' },
  saveText: { fontFamily: GOPUFF_FONTS.family, fontSize: 20, fontWeight: '900', fontStyle: 'italic', color: '#FFFFFF' },
  removeButton: { alignItems: 'center', paddingTop: 16, paddingBottom: 4 },
  removeButtonText: { fontFamily: GOPUFF_FONTS.family, fontSize: 18, fontWeight: '900', fontStyle: 'italic', color: '#777777' },
});
