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

// Shifts a 'YYYY-MM-DD' date string forward by N years, keeping month/day.
// Falls back to Feb 28 when Feb 29 doesn't exist in the target year.
export function shiftYear(dateStr, years) {
  if (!dateStr) return dateStr;
  const [y, m, d] = dateStr.split('-').map(Number);
  const targetYear = y + years;
  const isLeap = (yr) => (yr % 4 === 0 && yr % 100 !== 0) || yr % 400 === 0;
  const day = (m === 2 && d === 29 && !isLeap(targetYear)) ? 28 : d;
  return `${targetYear}-${String(m).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}
