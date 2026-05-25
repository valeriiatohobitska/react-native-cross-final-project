# Coffee Shop App — React Native

A mobile coffee ordering app built with React Native, TypeScript, Redux Toolkit, and React Navigation.

---

## Overview

The app lets users browse a coffee menu loaded from a REST API, add drinks to a cart, save favourites, filter by ingredient, and complete orders through a checkout flow. Completed orders are saved to a history screen.

[Demo](screenshots/demo.mov)

**Tech stack:** React Native 0.85 · TypeScript · Redux Toolkit · Context API · React Navigation (Drawer + Tab + Stack) · React Native Reanimated · React Native Gesture Handler

---

## Features

### Favourites

Heart button on every product card and on the product details screen. Tap to save or remove a drink. A dedicated **Favourites** tab shows saved drinks in a grid and displays an empty state when none are saved. The tab badge updates with the current count.

### Menu Filtering

A horizontal scrollable row of ingredient chips appears below the toolbar on the home screen. Selecting chips filters the menu (AND logic — a drink must contain all selected ingredients). The Filter button badge reflects the number of active filters.

### Order History

After a successful checkout the order is saved to Redux state and appears in the **History** tab. The history screen shows a real-time list of past orders with item summary, total, and date. An empty state is shown when no orders have been placed yet.

### Cart & Checkout

The cart screen lists added items with quantity controls and a running total. A **Checkout** button in the footer navigates to the payment screen. On payment confirmation the cart is cleared and the order is recorded.

---

## State Management

| State              | Tool        | Reason                                                 |
| ------------------ | ----------- | ------------------------------------------------------ |
| Light / dark theme | Context API | UI preference, no transactional requirements           |
| Favourites         | Context API | UI-level state, scoped to browsing, not transactional  |
| Shopping cart      | Redux       | Transactional data read across multiple screens        |
| Order history      | Redux       | Transactional data that must persist across navigation |

`FavouritesProvider` and `ThemeProvider` are mounted above the navigator so the tab bar can read favourites count for the badge. Redux `Provider` wraps the whole tree.

---

## Project Structure

```
src/
├── api/
│   └── coffeeApi.ts            # fetchCoffeeMenu(), fetchCoffeeProduct()
├── components/
│   ├── FavouriteButton.tsx     # Heart toggle button (inactive / active states)
│   ├── FilterChips.tsx         # Horizontal ingredient filter chip row
│   ├── ProductCard.tsx         # Card with spring-scale animation + heart overlay
│   ├── ApplePaySheet.tsx       # Apple Pay UI mock
│   ├── CheckoutHeader.tsx      # Checkout back button + title
│   ├── CoffeeIcon.tsx          # Lucide icon wrapper
│   ├── PayButton.tsx           # Primary CTA button
│   ├── PaymentOption.tsx       # Radio payment method selector
│   ├── RecentSearchList.tsx    # Recent search history list
│   ├── SearchField.tsx         # Search input with icon
│   ├── SuccessModal.tsx        # Order confirmation overlay
│   └── ToolbarButton.tsx       # Sort / Filter toolbar button with badge
├── constants/
│   ├── screens.ts              # Screen name constants
│   └── theme.ts                # Colors, spacing, typography, radii
├── context/
│   ├── FavouritesContext.tsx   # Favourites state + useFavourites() hook
│   └── ThemeContext.tsx        # Theme state + useTheme() hook
├── data/
│   └── products.ts             # CoffeeProduct type, static fallback data
├── navigation/
│   ├── DrawerNavigator.tsx     # Root drawer (Menu, Help, Contacts, Log out)
│   ├── StackNavigator.tsx      # Home → Product Details → Checkout
│   ├── TabNavigator.tsx        # Menu / Cart / History / Favourites / Profile
│   └── types.ts                # Navigation param list types
├── screens/
│   ├── CartScreen.tsx          # Cart list, quantity controls, Checkout button
│   ├── CheckoutScreen.tsx      # Payment selection, placeOrder + clearCart
│   ├── ContactsScreen.tsx      # Contact info (drawer)
│   ├── FavouritesScreen.tsx    # Favourites grid or empty state
│   ├── HelpScreen.tsx          # Help & support (drawer)
│   ├── HistoryScreen.tsx       # Order history from Redux
│   ├── HomeScreen.tsx          # Menu grid with search and filter chips
│   ├── LogoutScreen.tsx        # Logout confirmation (drawer)
│   ├── ProductDetailsScreen.tsx# Product image, details, Add to Cart, heart
│   ├── ProfileScreen.tsx       # Avatar, theme toggle
│   └── SearchScreen.tsx        # Full-screen search input
├── store/
│   ├── cartSlice.ts            # addItem, removeItem, updateQuantity, clearCart
│   ├── ordersSlice.ts          # Order type, placeOrder
│   └── store.ts                # configureStore, RootState, AppDispatch
└── utils/
    └── formatDate.ts           # dayjs-based date formatter
```

---

## Navigation Structure

```
DrawerNavigator
└── DRAWER_HOME → TabNavigator
    ├── TAB_MENU → StackNavigator
    │   ├── HOME
    │   ├── SEARCH
    │   ├── PRODUCT_DETAILS
    │   └── CHECKOUT
    ├── TAB_CART
    ├── TAB_HISTORY
    ├── TAB_FAVOURITES
    └── TAB_PROFILE
```

---

## Getting Started

### 1. Install dependencies

```sh
npm install
```

### 2. Install iOS native dependencies

```sh
pod install --project-directory=ios
```

> Re-run `pod install` after cloning or when native dependencies change.

### 3. Start Metro

```sh
npm start
```

### 4. Run the app

```sh
# iOS
npm run ios

# Android
npm run android
```
