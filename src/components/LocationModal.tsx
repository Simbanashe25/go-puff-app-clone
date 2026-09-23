import React, { useEffect, useState } from 'react';
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
import { Feather, Ionicons } from '@expo/vector-icons';
import { GOPUFF_FONTS } from '../constants/theme';

export interface SavedLocation {
  id: string;
  name: string;
  address: string;
  delivery: string;
}

interface LocationModalProps {
  visible: boolean;
  location: SavedLocation;
  onClose: () => void;
  onSelect: (location: SavedLocation) => void;
}

export const LocationModal: React.FC<LocationModalProps> = ({
  visible,
  location,
  onClose,
  onSelect,
}) => {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const [screen, setScreen] = useState<'list' | 'search' | 'details'>('list');
  const [query, setQuery] = useState('');
  const [selectedResult, setSelectedResult] = useState<SavedLocation | null>(null);
  const [flat, setFlat] = useState('');
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState('');

  useEffect(() => {
    if (visible) {
      setScreen('list');
      setQuery('');
      setSelectedResult(null);
      setFlat('');
      setIsLocating(false);
      setLocationError('');
    }
  }, [visible]);

  const close = () => {
    setScreen('list');
    setQuery('');
    setSelectedResult(null);
    setFlat('');
    setIsLocating(false);
    setLocationError('');
    onClose();
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('Current location is not available in this browser.');
      return;
    }

    setIsLocating(true);
    setLocationError('');
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const currentResult: SavedLocation = {
          id: 'current-location',
          name: 'Current location',
          address: `Coordinates: ${coords.latitude.toFixed(5)}, ${coords.longitude.toFixed(5)}`,
          delivery: 'Location found · Confirm your address below',
        };
        setSelectedResult(currentResult);
        setScreen('details');
        setIsLocating(false);
      },
      (error) => {
        setIsLocating(false);
        setLocationError(
          error.code === error.PERMISSION_DENIED
            ? 'Location permission was denied. Allow location access and try again.'
            : 'We could not find your location. Check your connection and try again.',
        );
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 },
    );
  };

  const results: SavedLocation[] = [
    {
      id: 'sheffield-station',
      name: 'Sheffield Station',
      address: 'Sheffield, Sheffield, England, S1 2BP',
      delivery: 'Est delivery - 12 mins · Open 24 hrs',
    },
    {
      id: 'sheffield-centre',
      name: 'Sheffield City Centre',
      address: 'Sheaf Street, Sheffield City Centre, Sheffield, UK',
      delivery: 'Est delivery - 15 mins · Open 24 hrs',
    },
    {
      id: 'sheffield-ter',
      name: 'Sheffield Ter',
      address: 'Harare, Zimbabwe',
      delivery: 'Est delivery - 18 mins · Open 24 hrs',
    },
  ];

  const chooseResult = (result: SavedLocation) => {
    setSelectedResult(result);
    setScreen('details');
  };

  const saveAddress = () => {
    if (!selectedResult) return;
    onSelect({
      ...selectedResult,
      name: flat.trim() ? flat.trim() : selectedResult.name,
    });
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
        <View style={[styles.card, isMobile && styles.cardMobile]}>
          <View style={styles.header}>
            {screen !== 'list' && (
              <TouchableOpacity onPress={() => setScreen(screen === 'details' ? 'search' : 'list')}>
                <Feather name="arrow-left" size={28} color="#111111" />
              </TouchableOpacity>
            )}
            <Text style={styles.title}>
              {screen === 'list' ? 'MY ADDRESS.' : 'ADD NEW ADDRESS.'}
            </Text>
            <TouchableOpacity onPress={close}>
              <Feather name="x" size={30} color="#111111" />
            </TouchableOpacity>
          </View>

          {screen === 'list' && (
            <ScrollView showsVerticalScrollIndicator contentContainerStyle={styles.listContent}>
              <View style={styles.deliveryPill}>
                <Text style={styles.deliveryTitle}>DELIVERY IN 12 MINS</Text>
                <Text style={styles.deliveryLocation}>{location.name} ✎</Text>
              </View>
              <TouchableOpacity style={styles.actionRow} onPress={() => setScreen('search')}>
                <Feather name="plus" size={29} color="#555555" />
                <Text style={styles.actionText}>Add new address</Text>
              </TouchableOpacity>
              <LocationRow location={location} selected onPress={() => { onSelect(location); close(); }} />
            </ScrollView>
          )}

          {screen === 'search' && (
            <View style={styles.searchScreen}>
              <TextInput
                autoFocus
                value={query}
                onChangeText={setQuery}
                placeholder="Address or Postcode"
                style={styles.searchInput}
                placeholderTextColor="#777777"
              />
              <TouchableOpacity
                style={[styles.actionRow, isLocating && styles.disabledRow]}
                onPress={getCurrentLocation}
                disabled={isLocating}
              >
                <Ionicons name="location-outline" size={28} color="#555555" />
                <Text style={styles.actionText}>
                  {isLocating ? 'Finding your location...' : 'Get current location'}
                </Text>
              </TouchableOpacity>
              {!!locationError && <Text style={styles.locationError}>{locationError}</Text>}
              {results
                .filter((result) => !query || `${result.name} ${result.address}`.toLowerCase().includes(query.toLowerCase()))
                .map((result) => (
                  <LocationRow key={result.id} location={result} onPress={() => chooseResult(result)} />
                ))}
              {query.length > 0 &&
                results.every((result) => !`${result.name} ${result.address}`.toLowerCase().includes(query.toLowerCase())) && (
                  <View style={styles.emptySearch}>
                    <Feather name="search" size={34} color="#777777" />
                    <Text style={styles.emptyTitle}>No addresses found</Text>
                    <Text style={styles.emptyText}>Try searching with a different address or postcode.</Text>
                  </View>
                )}
            </View>
          )}

          {screen === 'details' && selectedResult && (
            <View style={styles.detailsScreen}>
              <View style={styles.mapPlaceholder}>
                <Text style={styles.mapLabel}>Map preview</Text>
              </View>
              <LocationRow location={selectedResult} />
              <TextInput
                value={flat}
                onChangeText={setFlat}
                placeholder="Flat Number/Name"
                placeholderTextColor="#777777"
                style={styles.addressInput}
              />
              <View style={styles.saveAsRow}>
                <Text style={styles.saveAsText}>Save as my</Text>
                <TouchableOpacity style={styles.saveChip}><Feather name="home" size={20} color="#777777" /><Text>Home</Text></TouchableOpacity>
                <TouchableOpacity style={styles.saveChip}><Feather name="briefcase" size={20} color="#777777" /><Text>Work</Text></TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.saveButton} onPress={saveAddress}>
                <Text style={styles.saveButtonText}>SAVE AND FINISH</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

const LocationRow: React.FC<{
  location: SavedLocation;
  selected?: boolean;
  onPress?: () => void;
}> = ({ location, selected, onPress }) => (
  <TouchableOpacity style={[styles.locationRow, selected && styles.locationSelected]} onPress={onPress}>
    <Ionicons name="location-outline" size={28} color="#555555" />
    <View style={styles.locationCopy}>
      <Text style={styles.locationName}>{location.name}</Text>
      <Text style={styles.locationAddress}>{location.address}</Text>
      <Text style={styles.locationDelivery}>{location.delivery}</Text>
    </View>
    {selected && <Feather name="check" size={25} color="#8000FF" />}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  overlayMobile: { justifyContent: 'flex-end' },
  backdrop: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.68)' },
  card: { width: 720, maxWidth: 'calc(100% - 28px)' as any, maxHeight: '86%', backgroundColor: '#FFFFFF', borderRadius: 22, overflow: 'hidden', ...Platform.select({ web: { boxShadow: '0 10px 32px rgba(0,0,0,0.28)' } as any }) },
  cardMobile: { width: '100%', maxWidth: '100%', maxHeight: '90%', borderBottomLeftRadius: 0, borderBottomRightRadius: 0, borderTopLeftRadius: 22, borderTopRightRadius: 22 },
  header: { minHeight: 84, paddingHorizontal: 24, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 14 },
  title: { flex: 1, fontFamily: GOPUFF_FONTS.black, fontSize: 30, fontStyle: 'italic', color: '#111111' },
  listContent: { paddingHorizontal: 22, paddingBottom: 20 },
  deliveryPill: { borderWidth: 8, borderColor: '#EEEEEE', borderRadius: 48, paddingVertical: 12, alignItems: 'center', marginBottom: 14 },
  deliveryTitle: { fontFamily: GOPUFF_FONTS.family, fontSize: 22, fontWeight: '900', fontStyle: 'italic' },
  deliveryLocation: { fontFamily: GOPUFF_FONTS.family, fontSize: 17 },
  actionRow: { minHeight: 74, borderBottomWidth: 1, borderBottomColor: '#E5E7EB', flexDirection: 'row', alignItems: 'center', gap: 24, paddingHorizontal: 12 },
  actionText: { fontFamily: GOPUFF_FONTS.black, fontSize: 23, fontWeight: '900', color: '#555555' },
  disabledRow: { opacity: 0.55 },
  locationError: { fontFamily: GOPUFF_FONTS.family, fontSize: 16, lineHeight: 22, color: '#B42318', paddingHorizontal: 12, paddingTop: 14 },
  locationRow: { minHeight: 92, borderBottomWidth: 1, borderBottomColor: '#E5E7EB', flexDirection: 'row', alignItems: 'center', gap: 22, paddingHorizontal: 12, paddingVertical: 12 },
  locationSelected: { backgroundColor: '#8000FF' },
  locationCopy: { flex: 1 },
  locationName: { fontFamily: GOPUFF_FONTS.family, fontSize: 21, fontWeight: '700', color: '#4B4B4B' },
  locationAddress: { fontFamily: GOPUFF_FONTS.family, fontSize: 17, color: '#4B4B4B', marginTop: 3 },
  locationDelivery: { fontFamily: GOPUFF_FONTS.family, fontSize: 14, color: '#4B4B4B', marginTop: 5 },
  searchScreen: { paddingHorizontal: 22, paddingBottom: 20 },
  emptySearch: { alignItems: 'center', justifyContent: 'center', paddingVertical: 52, paddingHorizontal: 24 },
  emptyTitle: { fontFamily: GOPUFF_FONTS.family, fontSize: 23, fontWeight: '700', color: '#555555', marginTop: 14 },
  emptyText: { fontFamily: GOPUFF_FONTS.family, fontSize: 16, color: '#777777', textAlign: 'center', marginTop: 8 },
  searchInput: { height: 68, borderWidth: 1, borderColor: '#8000FF', borderRadius: 8, paddingHorizontal: 16, fontFamily: GOPUFF_FONTS.family, fontSize: 20 },
  detailsScreen: { paddingHorizontal: 22, paddingBottom: 22 },
  mapPlaceholder: { height: 130, backgroundColor: '#8000FF', alignItems: 'center', justifyContent: 'center' },
  mapLabel: { fontFamily: GOPUFF_FONTS.family, color: '#6B7280', fontSize: 18 },
  addressInput: { height: 68, borderWidth: 1, borderColor: '#AAAAAA', borderRadius: 10, paddingHorizontal: 16, fontFamily: GOPUFF_FONTS.family, fontSize: 20, marginTop: 16 },
  saveAsRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 16 },
  saveAsText: { fontFamily: GOPUFF_FONTS.family, fontSize: 17, color: '#555555' },
  saveChip: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 18, paddingVertical: 11, borderRadius: 24, backgroundColor: '#FFFFFF', ...Platform.select({ web: { boxShadow: '0 3px 12px rgba(0,0,0,0.12)' } as any }) },
  saveButton: { height: 54, borderRadius: 28, backgroundColor: '#8000FF', alignItems: 'center', justifyContent: 'center', marginTop: 8 },
  saveButtonText: { fontFamily: GOPUFF_FONTS.family, fontSize: 19, fontWeight: '900', fontStyle: 'italic', color: '#FFFFFF' },
});
