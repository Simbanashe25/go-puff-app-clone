import { ALL_PRODUCT_ASSETS, PRODUCT_PACKSHOT_IMAGES } from '../assets/productAssets';

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  discount: string;
  unitInfo: string;
  imageSource: any;
  cardWidth?: number;
  categoryId?: string;
  highlights?: ProductDetailSection[];
  nutrition?: NutritionRow[];
}

export interface ProductDetailSection {
  title: string;
  content: string;
}

export interface NutritionRow {
  label: string;
  value: string;
}

export const EXACT_CAROUSEL_PRODUCTS: Product[] = [
  {
    id: 'prod-hardys',
    name: 'Hardys VR White\nDuo',
    price: 13.50,
    originalPrice: 15.00,
    discount: '10% OFF',
    unitInfo: '1pcs · $13.50/each',
    imageSource: PRODUCT_PACKSHOT_IMAGES.hardys_vr,
    cardWidth: 160,
  },
  {
    id: 'prod-burger',
    name: 'Burger Bundle',
    price: 5.63,
    originalPrice: 6.25,
    discount: '10% OFF',
    unitInfo: '1pcs · $5.63/each',
    imageSource: PRODUCT_PACKSHOT_IMAGES.burger_bundle,
    cardWidth: 160,
  },
  {
    id: 'prod-magnum',
    name: "Magnum, Cole'd &\nFree Magnum ...",
    price: 12.50,
    originalPrice: 14.90,
    discount: '16% OFF',
    unitInfo: '1pcs · $12.50/each',
    imageSource: PRODUCT_PACKSHOT_IMAGES.magnum_bundle,
    cardWidth: 160,
  },
  {
    id: 'prod-mackies',
    name: "Mackie's Real Dairy\nIce Cream & Waffl...",
    price: 4.68,
    originalPrice: 5.20,
    discount: '10% OFF',
    unitInfo: '1pcs · $4.68/each',
    imageSource: PRODUCT_PACKSHOT_IMAGES.mackies_ice_cream,
    cardWidth: 160,
    nutrition: [
      { label: 'Energy', value: '198 kcal' },
      { label: 'Fat', value: '8.6g' },
      { label: 'Carbohydrates', value: '27.4g' },
      { label: 'Protein', value: '3.5g' },
    ],
  },
  {
    id: 'prod-boursin',
    name: 'Boursin Pasta\nBundle',
    price: 5.00,
    originalPrice: 6.05,
    discount: '17% OFF',
    unitInfo: '1pcs · $5.00/each',
    imageSource: PRODUCT_PACKSHOT_IMAGES.boursin_pasta,
    cardWidth: 160,
    highlights: [
      {
        title: 'Ingredients',
        content:
          'Boursin Garlic & Herbs Soft French Cheese, 150g: Pasteurised Milk and Cream, Lactic Ferments, Garlic and Herbs 1.9%, Salt, Pepper. Barilla Spaghetti, 500g: Durum Wheat Semolina, Water.',
      },
      {
        title: 'Additional info',
        content: 'Vegetarian\nContains Milk, Gluten.',
      },
    ],
    nutrition: [
      { label: 'Energy', value: '230 kcal' },
      { label: 'Fat', value: '12.5g' },
      { label: 'Carbohydrates', value: '25.1g' },
      { label: 'Protein', value: '7.8g' },
      { label: 'Salt', value: '0.82g' },
    ],
  },
  {
    id: 'prod-chorizo',
    name: 'Creamy Chorizo\nPenne, Serves 4',
    price: 8.86,
    originalPrice: 9.84,
    discount: '10% OFF',
    unitInfo: '1pcs · $8.86/each',
    imageSource: PRODUCT_PACKSHOT_IMAGES.creamy_chorizo,
    cardWidth: 160,
  },
  {
    id: 'prod-bottega',
    name: 'Bottega\nMini Duc...',
    price: 9.90,
    originalPrice: 11.00,
    discount: '10% OFF',
    unitInfo: '1pcs · $9.90/each',
    imageSource: PRODUCT_PACKSHOT_IMAGES.bottega_mini,
    cardWidth: 160,
  },
];

export const EXCLUSIVE_DEALS_PRODUCTS = EXACT_CAROUSEL_PRODUCTS;

const CATEGORY_PRODUCT_NAMES = [
  'Hardys VR White Duo',
  'Burger Bundle',
  "Magnum Classic Ice Cream",
  "Mackie's Real Dairy Ice Cream",
  'Boursin Pasta Bundle',
  'Creamy Chorizo Penne',
  'Bottega Mini Prosecco',
  'Fresh Strawberries',
  'Blueberry Pack',
  'Crispy Sea Salt Crisps',
  'Milk Chocolate Bar',
  'Free Range Eggs',
  'Mature Cheddar',
  'Sourdough Bloomer',
  'Chicken Breast Fillets',
  'Beef Mince',
  'Atlantic Salmon Fillets',
  'Sparkling Water',
  'Cola Classic',
  'Orange Juice',
  'Salted Peanuts',
  'Tortilla Chips',
  'Gummy Sweets',
  'Chocolate Cookie Bites',
  'Vanilla Ice Cream',
  'Garlic Bread',
  'Margherita Pizza',
  'Chicken Tikka Masala',
  'Thai Green Curry',
  'Everyday Essentials Bundle',
];

const CATEGORY_PRODUCT_IDS = [
  'alcohol',
  'bakery',
  'ice-cream',
  'ice-cream',
  'eggs-dairy',
  'meat-fish',
  'alcohol',
  'fruit-veg',
  'fruit-veg',
  'snacks',
  'confectionery',
  'eggs-dairy',
  'eggs-dairy',
  'bakery',
  'meat-fish',
  'meat-fish',
  'meat-fish',
  'drinks',
  'drinks',
  'drinks',
  'snacks',
  'snacks',
  'confectionery',
  'confectionery',
  'ice-cream',
  'confectionery',
  'ice-cream',
  'bakery',
  'bakery',
  'asian-mart',
  'asian-mart',
  'apm',
];

export const CATEGORY_PRODUCTS: Product[] = ALL_PRODUCT_ASSETS.map(
  (imageSource, index) => ({
    id: `category-product-${index + 1}`,
    name: CATEGORY_PRODUCT_NAMES[index],
    price: 2.5 + (index % 8) * 1.25,
    originalPrice: 0,
    discount: '',
    unitInfo: '1pcs',
    imageSource,
    cardWidth: 160,
    categoryId: CATEGORY_PRODUCT_IDS[index],
  }),
);
