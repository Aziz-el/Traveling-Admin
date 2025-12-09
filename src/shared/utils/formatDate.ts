export function formatDateRange(start?: string, end?: string) {
  if (!start && !end) return '';

  const toDate = (s?: string) => {
    if (!s) return null;
    const iso = s.includes('T') ? s : s.replace(' ', 'T');
    const withSeconds = iso.length === 16 ? `${iso}:00` : iso;
    const d = new Date(withSeconds);
    return isNaN(d.getTime()) ? null : d;
  };

  const startDate = toDate(start);
  const endDate = toDate(end);

  const opts: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  const fmt = new Intl.DateTimeFormat('ru-RU', opts);

  if (startDate && endDate) {
    return `${fmt.format(startDate)} — ${fmt.format(endDate)}`;
  }
  if (startDate) return fmt.format(startDate);
  if (endDate) return fmt.format(endDate);
  return '';
}

export function formatDateShort(s?: string) {
  if (!s) return '';
  const iso = s.includes('T') ? s : s.replace(' ', 'T');
  const withSeconds = iso.length === 16 ? `${iso}:00` : iso;
  const d = new Date(withSeconds);
  if (isNaN(d.getTime())) return s;
  return new Intl.DateTimeFormat('ru-RU', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }).format(d);
}
