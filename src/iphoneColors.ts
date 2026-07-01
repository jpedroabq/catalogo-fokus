export const IPHONE_COLORS: Record<string, string> = {
  // Portuguese names used in the product data
  'preto-espacial': '#403E3D',
  'prateado': '#F0F2F2',
  'roxo-profundo': '#594F63',
  'ultramarino': '#9AADF6',
  'rosa': '#F2ADDA',
  'titânio natural': '#C2BCB2',
  'titânio deserto': '#BFA48F',
  'laranja-cósmico': '#F77E2D',
  'azul-intenso': '#32374A',
  'branco-nuvem': '#FCFCFC',
  'preto': '#3C4042',
  'branco': '#FAFAFA',

  // English names
  'space black': '#403E3D',
  'silver': '#F0F2F2',
  'deep purple': '#594F63',
  'ultramarine': '#9AADF6',
  'pink': '#F2ADDA',
  'natural titanium': '#C2BCB2',
  'desert titanium': '#BFA48F',
  'cosmic orange': '#F77E2D',
  'deep blue': '#32374A',
  'cloud white': '#FCFCFC',
  'black': '#3C4042',
  'white': '#FAFAFA',
  'soft pink': '#FCE7E6',
  'sky blue': '#F0F9FF',
  'light gold': '#FFFCF5',
  'lavender': '#DFCEEA',
  'mist blue': '#96AED1',
  'sage': '#A9B689',
  'teal': '#B0D4D2',
  'blue titanium': '#2F4452',
  'black titanium': '#3C3C3D',
  'white titanium': '#F2F1ED',
  'blue': '#276787',
  'green': '#394C38',
  'midnight': '#232A31',
  'starlight': '#FAF6F2',
  'purple': '#E6DDEB',
  'yellow': '#F9E479',
  'gold': '#F4E8CE',
  'sierra blue': '#A7C1D9',
  'alpine green': '#576856',
  'graphite': '#54524F',
  'pacific blue': '#2D4E5C',
  'midnight green': '#4E5851',
  'space gray': '#535150',
  'coral': '#FF6E5A',
  'product-red': '#FC0324',
}

export function getColorHex(colorName: string): string | null {
  const key = colorName.trim().toLowerCase()
  return IPHONE_COLORS[key] ?? null
}

export function isLightColor(hex: string): boolean {
  const c = hex.replace('#', '')
  const r = parseInt(c.substring(0, 2), 16)
  const g = parseInt(c.substring(2, 4), 16)
  const b = parseInt(c.substring(4, 6), 16)
  return (r * 0.299 + g * 0.587 + b * 0.114) > 180
}
