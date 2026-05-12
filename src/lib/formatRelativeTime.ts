import type { ISODateString } from '@/lib/domain';

export function formatRelativeTime(iso: ISODateString, now: Date = new Date()): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '';

  const deltaMs = now.getTime() - date.getTime();
  const minute = 60_000;
  const hour = 60 * minute;
  const day = 24 * hour;

  if (deltaMs < minute) return 'Just now';
  if (deltaMs < hour) return `${Math.max(1, Math.floor(deltaMs / minute))}m ago`;
  if (deltaMs < day) return `${Math.max(1, Math.floor(deltaMs / hour))}h ago`;

  const days = Math.floor(deltaMs / day);
  if (days === 1) return 'Yesterday';
  return `${days}d ago`;
}

