import {
  startOfWeek, endOfWeek, eachDayOfInterval,
  format, isSameMonth, isSameDay, isToday,
  parseISO, addMonths, subMonths,
} from 'date-fns';
import { MONTHS, DAYS_FULL } from './constants';

export { format, isSameMonth, isSameDay, isToday, parseISO, addMonths, subMonths };

export function getMonthGrid(year, month) {
  const firstDay = new Date(year, month, 1);
  const lastDay  = new Date(year, month + 1, 0);
  const start = startOfWeek(firstDay, { weekStartsOn: 0 });
  const end   = endOfWeek(lastDay,   { weekStartsOn: 0 });
  return eachDayOfInterval({ start, end });
}

export function formatMonthYear(date) {
  return `${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
}

export function formatDateFilipino(dateStr) {
  const date = parseISO(dateStr);
  const dayName = DAYS_FULL[date.getDay()];
  return `${dayName}, ${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
}

export function formatTime12(time) {
  if (!time) return '';
  const [h, m] = time.split(':');
  const hour = parseInt(h, 10);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const h12  = hour % 12 || 12;
  return `${h12}:${m} ${ampm}`;
}

export function formatMonthAbbr(dateStr) {
  const date = parseISO(dateStr);
  return MONTHS[date.getMonth()].substring(0, 3).toUpperCase();
}

export function formatDayNum(dateStr) {
  return parseISO(dateStr).getDate();
}

export function todayStr() {
  return format(new Date(), 'yyyy-MM-dd');
}
