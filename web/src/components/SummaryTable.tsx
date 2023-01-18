import { generateDateRange } from '../utils/date-utils';
import { HabitDay } from './HabitDay';

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

const summaryDates = generateDateRange();

const minimumSummaryDatesSize = 18 * 7;
const emptyDaysLeft = minimumSummaryDatesSize - summaryDates.length;

export function SummaryTable() {
  return (
    <div className="w-full flex">
      <div className="grid grid-rows-7 grid-flow-row gap-3">
        {weekDays.map((day, index) => (
          <div
            key={`week-day-${day}-${index}`}
            className="text-zinc-400 text-xl font-bold h-10 w-10 flex items-center justify-center"
          >
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-rows-7 grid-flow-col gap-3">
        {summaryDates.map(date => (
          <HabitDay key={date.toISOString()} />
        ))}

        {emptyDaysLeft > 0 &&
          Array.from({ length: emptyDaysLeft }).map((_, index) => (
            <HabitDay
              key={`empty-day-${index}`}
              className="opacity-40 cursor-not-allowed"
            />
          ))}
      </div>
    </div>
  );
}
