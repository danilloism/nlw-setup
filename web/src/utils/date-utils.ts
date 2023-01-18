import dayjs from 'dayjs';

export function generateDateRange() {
  const firstDayOfYear = dayjs().startOf('year');

  const today = new Date();

  const dates: Date[] = [];

  for (
    let dateToCompare = firstDayOfYear;
    dateToCompare.isBefore(today);
    dateToCompare = dateToCompare.add(1, 'day')
  ) {
    dates.push(dateToCompare.toDate());
  }

  return dates;
}
