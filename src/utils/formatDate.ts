import dayjs from 'dayjs';

// Formats an ISO date string for display in order history (e.g. "May 24, 2026 · 14:30")
export function formatOrderDate(isoDate: string): string {
  return dayjs(isoDate).format('MMM D, YYYY · HH:mm');
}
