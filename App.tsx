import React from 'react';
import { StatusBar, StyleSheet, useWindowDimensions, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { DrawerNavigator } from './src/navigation/DrawerNavigator';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';
import { FavouritesProvider } from './src/context/FavouritesContext';
import { store } from './src/store/store';
import { layout } from './src/constants/theme';

function AppContent() {
  const { theme, colors } = useTheme();
  const { width } = useWindowDimensions();
  const appWidth = Math.min(width, layout.phoneMaxWidth);

  return (
    <>
      <StatusBar
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />
      <View style={[styles.root, { backgroundColor: colors.background }]}>
        <View style={[styles.phone, { width: appWidth, backgroundColor: colors.background }]}>
          <NavigationContainer>
            <DrawerNavigator />
          </NavigationContainer>
        </View>
      </View>
    </>
  );
}

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <FavouritesProvider>
          <SafeAreaProvider>
            <AppContent />
          </SafeAreaProvider>
        </FavouritesProvider>
      </ThemeProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
  },
  phone: {
    flex: 1,
    overflow: 'hidden',
  },
});

export default App;
