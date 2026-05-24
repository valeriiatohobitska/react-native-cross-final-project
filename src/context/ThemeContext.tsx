import React, { createContext, useContext, useState } from 'react';

export type ThemeMode = 'light' | 'dark';

export type ThemeColors = {
  background: string;
  surface: string;
  card: string;
  text: string;
  muted: string;
  softMuted: string;
  border: string;
  coffee: string;
  coffeeDark: string;
  black: string;
  successOverlay: string;
  appleBlue: string;
};

const LIGHT_COLORS: ThemeColors = {
  background: '#FFFFFF',
  surface: '#F7F8FC',
  card: '#F5F6FA',
  text: '#24252B',
  muted: '#7C808A',
  softMuted: '#C8CDD6',
  border: '#E0E3EA',
  coffee: '#B48567',
  coffeeDark: '#8E6045',
  black: '#000000',
  successOverlay: 'rgba(18, 19, 24, 0.78)',
  appleBlue: '#007AFF',
};

const DARK_COLORS: ThemeColors = {
  background: '#121318',
  surface: '#1E1F26',
  card: '#252730',
  text: '#F0F0F4',
  muted: '#9A9DA8',
  softMuted: '#4A4D5A',
  border: '#2E3040',
  coffee: '#C89B7B',
  coffeeDark: '#A87050',
  black: '#000000',
  successOverlay: 'rgba(0, 0, 0, 0.85)',
  appleBlue: '#0A84FF',
};

type ThemeContextValue = {
  theme: ThemeMode;
  colors: ThemeColors;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeMode>('light');
  const toggleTheme = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  const colors = theme === 'light' ? LIGHT_COLORS : DARK_COLORS;

  return (
    <ThemeContext.Provider value={{ theme, colors, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used inside ThemeProvider');
  }
  return ctx;
}
