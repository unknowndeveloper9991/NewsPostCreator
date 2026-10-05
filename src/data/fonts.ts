export interface FontOption {
  name: string;
  family: string;
  category: 'Display / Impact' | 'Modern Sans' | 'Editorial Serif' | 'Editorial Condensed';
  weights: number[];
  recommendedTransform?: 'uppercase' | 'none';
}

export const FONTS: FontOption[] = [
  {
    name: 'Oswald',
    family: "'Oswald', sans-serif",
    category: 'Editorial Condensed',
    weights: [400, 500, 600, 700],
    recommendedTransform: 'uppercase',
  },
  {
    name: 'Bebas Neue',
    family: "'Bebas Neue', cursive",
    category: 'Display / Impact',
    weights: [400],
    recommendedTransform: 'uppercase',
  },
  {
    name: 'Montserrat',
    family: "'Montserrat', sans-serif",
    category: 'Modern Sans',
    weights: [400, 600, 700, 800, 900],
  },
  {
    name: 'Inter',
    family: "'Inter', sans-serif",
    category: 'Modern Sans',
    weights: [400, 500, 600, 700, 800, 900],
  },
  {
    name: 'Anton',
    family: "'Anton', sans-serif",
    category: 'Display / Impact',
    weights: [400],
    recommendedTransform: 'uppercase',
  },
  {
    name: 'Archivo Black',
    family: "'Archivo Black', sans-serif",
    category: 'Display / Impact',
    weights: [400],
    recommendedTransform: 'uppercase',
  },
  {
    name: 'Roboto Condensed',
    family: "'Roboto Condensed', sans-serif",
    category: 'Editorial Condensed',
    weights: [400, 600, 700, 800],
  },
  {
    name: 'Playfair Display',
    family: "'Playfair Display', serif",
    category: 'Editorial Serif',
    weights: [400, 600, 700, 900],
  },
  {
    name: 'Merriweather',
    family: "'Merriweather', serif",
    category: 'Editorial Serif',
    weights: [300, 400, 700, 900],
  },
  {
    name: 'Space Grotesk',
    family: "'Space Grotesk', sans-serif",
    category: 'Modern Sans',
    weights: [500, 600, 700],
  },
  {
    name: 'Syne',
    family: "'Syne', sans-serif",
    category: 'Display / Impact',
    weights: [600, 700, 800],
  },
];
