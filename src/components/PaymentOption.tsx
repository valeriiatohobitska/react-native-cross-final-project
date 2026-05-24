import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { radii, spacing, typography } from '../constants/theme';
import { CoffeeIcon } from './CoffeeIcon';

type PaymentOptionProps = {
  title: string;
  selected?: boolean;
  checkedLabel?: string;
  onPress?: () => void;
};

export function PaymentOption({
  title,
  selected = false,
  checkedLabel,
  onPress,
}: PaymentOptionProps) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.78}
      onPress={onPress}
      style={[styles.card, { backgroundColor: colors.background, borderColor: colors.border }]}>
      <View style={styles.titleRow}>
        <View
          style={[
            styles.radio,
            { borderColor: colors.softMuted },
            selected && { borderColor: colors.coffee, backgroundColor: colors.coffee },
          ]}>
          {selected ? <View style={[styles.dot, { backgroundColor: colors.background }]} /> : null}
        </View>
        <Text style={[styles.title, { color: colors.muted }]}>{title}</Text>
      </View>
      {checkedLabel ? (
        <View style={styles.checkRow}>
          <View style={[styles.checkbox, { backgroundColor: colors.coffee }]}>
            <CoffeeIcon name="check" size={12} color={colors.background} />
          </View>
          <Text style={[styles.checkLabel, { color: colors.muted }]}>{checkedLabel}</Text>
        </View>
      ) : null}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 48,
    justifyContent: 'center',
    padding: spacing.lg,
    borderWidth: 1,
    borderRadius: radii.md,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  radio: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
  },
  title: {
    fontSize: typography.caption,
    fontWeight: '800',
  },
  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingLeft: 26,
    paddingTop: spacing.xl,
  },
  checkbox: {
    width: 16,
    height: 16,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkLabel: {
    flex: 1,
    fontSize: typography.caption,
    lineHeight: 17,
  },
});
