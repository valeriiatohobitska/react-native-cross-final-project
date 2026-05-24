import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';
import { spacing, typography } from '../constants/theme';
import { formatOrderDate } from '../utils/formatDate';

// Sample past orders — in a real app these would come from the API/store
const SAMPLE_ORDERS = [
  { id: '1', title: 'Espresso', price: '$3.50', date: '2026-05-23T09:14:00Z' },
  { id: '2', title: 'Cappuccino', price: '$4.20', date: '2026-05-22T15:30:00Z' },
  { id: '3', title: 'Cold Brew', price: '$5.00', date: '2026-05-21T11:05:00Z' },
];

export function HistoryScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.screen, { backgroundColor: colors.background, paddingTop: insets.top + spacing.lg }]}>
      <Text style={[styles.title, { color: colors.text }]}>Order history</Text>
      <Text style={[styles.description, { color: colors.muted }]}>
        Recent coffee orders and receipts are grouped here.
      </Text>
      <View style={styles.list}>
        {SAMPLE_ORDERS.map(order => (
          <View
            key={order.id}
            style={[styles.row, { borderBottomColor: colors.border }]}>
            <View style={styles.rowBody}>
              <Text style={[styles.rowTitle, { color: colors.text }]}>
                {order.title}
              </Text>
              {/* formatOrderDate uses dayjs — replaces moment.js (227 kB → 2 kB) */}
              <Text style={[styles.rowDate, { color: colors.muted }]}>
                {formatOrderDate(order.date)}
              </Text>
            </View>
            <Text style={[styles.rowPrice, { color: colors.text }]}>
              {order.price}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: spacing.lg,
  },
  title: {
    fontSize: typography.title,
    fontWeight: '900',
  },
  description: {
    fontSize: typography.body,
    lineHeight: 21,
    marginTop: spacing.sm,
    marginBottom: spacing.xl,
  },
  list: {
    gap: spacing.xs,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
  },
  rowBody: {
    gap: spacing.xs,
  },
  rowTitle: {
    fontSize: typography.body,
    fontWeight: '700',
  },
  rowDate: {
    fontSize: typography.caption,
  },
  rowPrice: {
    fontSize: typography.body,
    fontWeight: '900',
  },
});
