import { MONTHS } from './constants';
import { parseISO } from 'date-fns';

export function formatMonthAbbr(dateStr) {
  return MONTHS[parseISO(dateStr).getMonth()].substring(0, 3).toUpperCase();
}

export function formatDayNum(dateStr) {
  return parseISO(dateStr).getDate();
}

export function formatTimeAmPm(time) {
  if (!time) return '';
  const [h, m] = time.split(':');
  const hour   = parseInt(h, 10);
  const ampm   = hour >= 12 ? 'PM' : 'AM';
  const h12    = hour % 12 || 12;
  return `${h12}:${m} ${ampm}`;
}

export function formatShortDate(dateStr) {
  const d = parseISO(dateStr);
  return `${d.getDate()} ${MONTHS[d.getMonth()].substring(0, 3)}`;
}
