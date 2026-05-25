import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';
import { RootState } from '../store/store';
import { spacing, typography } from '../constants/theme';
import { formatOrderDate } from '../utils/formatDate';

export function HistoryScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const orders = useSelector((state: RootState) => state.orders);

  return (
    <View style={[styles.screen, { backgroundColor: colors.background, paddingTop: insets.top + spacing.lg }]}>
      <Text style={[styles.title, { color: colors.text }]}>Order history</Text>
      <Text style={[styles.description, { color: colors.muted }]}>
        Recent coffee orders and receipts are grouped here.
      </Text>
      {orders.length === 0 ? (
        <Text style={[styles.emptyText, { color: colors.muted }]}>
          No orders yet. Complete a purchase to see your history here.
        </Text>
      ) : (
        <View style={styles.list}>
          {orders.map(order => {
            const rowTitle =
              order.items.length === 1
                ? order.items[0].title
                : `${order.items[0].title} & ${order.items.length - 1} more`;

            return (
              <View
                key={order.id}
                style={[styles.row, { borderBottomColor: colors.border }]}>
                <View style={styles.rowBody}>
                  <Text style={[styles.rowTitle, { color: colors.text }]}>
                    {rowTitle}
                  </Text>
                  <Text style={[styles.rowDate, { color: colors.muted }]}>
                    {formatOrderDate(order.date)}
                  </Text>
                </View>
                <Text style={[styles.rowPrice, { color: colors.text }]}>
                  {order.total}
                </Text>
              </View>
            );
          })}
        </View>
      )}
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
  emptyText: {
    fontSize: typography.body,
    lineHeight: 21,
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
    flex: 1,
    marginRight: spacing.md,
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
