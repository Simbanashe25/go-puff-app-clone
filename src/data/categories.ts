export interface CategoryItem {
  id: string;
  label: string;
  bgColor: string;
  type: 'deals' | 'apm' | 'asian_mart' | 'fruit_veg' | 'eggs_dairy' | 'bakery' | 'meat_fish' | 'alcohol' | 'drinks' | 'snacks' | 'confectionery' | 'ice_cream';
  imageUrl?: string;
  badgeEmoji?: string;
}

export const GOPUFF_CATEGORIES: CategoryItem[] = [
  {
    id: 'deals',
    label: 'Deals',
    bgColor: '#E51937',
    type: 'deals',
  },
  {
    id: 'apm',
    label: 'Aldi\nPrice Match',
    bgColor: '#0B1B4F',
    type: 'apm',
  },
  {
    id: 'asian-mart',
    label: 'Asian\nMart',
    bgColor: '#FDF1E7',
    type: 'asian_mart',
  },
  {
    id: 'fruit-veg',
    label: 'Fruit & Veg',
    bgColor: '#B7E4C7',
    type: 'fruit_veg',
  },
  {
    id: 'eggs-dairy',
    label: 'Eggs & Dairy',
    bgColor: '#8000FF',
    type: 'eggs_dairy',
  },
  {
    id: 'bakery',
    label: 'Bakery',
    bgColor: '#F6D04B',
    type: 'bakery',
  },
  {
    id: 'meat-fish',
    label: 'Meat & Fish',
    bgColor: '#A7F3D0',
    type: 'meat_fish',
  },
  {
    id: 'alcohol',
    label: 'Alcohol',
    bgColor: '#FECDD3',
    type: 'alcohol',
  },
  {
    id: 'drinks',
    label: 'Drinks',
    bgColor: '#8000FF',
    type: 'drinks',
  },
  {
    id: 'snacks',
    label: 'Snacks',
    bgColor: '#FEF08A',
    type: 'snacks',
  },
  {
    id: 'confectionery',
    label: 'Confectionery',
    bgColor: '#A7F3D0',
    type: 'confectionery',
  },
  {
    id: 'ice-cream',
    label: 'Ice Cream',
    bgColor: '#0284C7',
    type: 'ice_cream',
  },
];
