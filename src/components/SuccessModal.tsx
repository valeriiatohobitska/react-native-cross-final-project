import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { radii, shadows, spacing, typography } from '../constants/theme';

type SuccessModalProps = {
  visible: boolean;
  onDone: () => void;
  onMenu: () => void;
};

export function SuccessModal({ visible, onDone, onMenu }: SuccessModalProps) {
  const { colors } = useTheme();

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View
        style={[styles.overlay, { backgroundColor: colors.successOverlay }]}
      >
        <View style={[styles.dialog, { backgroundColor: colors.background }]}>
          <Text style={[styles.title, { color: colors.text }]}>Success</Text>
          <Text style={[styles.message, { color: colors.muted }]}>
            Coffee is on it's way!{'\n'}Go check something else to order
          </Text>
          <View style={styles.actions}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={onDone}
              style={[
                styles.button,
                {
                  backgroundColor: colors.background,
                  borderColor: colors.coffee,
                  borderWidth: 1,
                },
              ]}
            >
              <Text style={[styles.buttonText, { color: colors.coffee }]}>
                Done
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={onMenu}
              style={[styles.button, { backgroundColor: colors.coffee }]}
            >
              <Text style={[styles.buttonText, { color: colors.background }]}>
                Go to Menu
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xxl,
  },
  dialog: {
    width: '100%',
    maxWidth: 330,
    padding: spacing.lg,
    borderRadius: radii.lg,
    ...shadows,
  },
  title: {
    fontSize: typography.heading,
    fontWeight: '900',
    textAlign: 'center',
  },
  message: {
    fontSize: typography.caption,
    lineHeight: 18,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.xl,
  },
  button: {
    flex: 1,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radii.sm,
  },
  buttonText: {
    fontSize: typography.caption,
    fontWeight: '800',
  },
});
