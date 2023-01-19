import { generateDateRange } from '../utils/date-utils';
import { HabitDay } from './HabitDay';

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

const summaryDates = generateDateRange();

const minimumSummaryDatesSize = 18 * 7;
const emptyDaysLeft = minimumSummaryDatesSize - summaryDates.length;

export function SummaryTable() {
  return (
    <div className="flex w-full">
      <div className="grid-rows-7 grid grid-flow-row gap-3">
        {weekDays.map((day, index) => (
          <div
            key={`week-day-${day}-${index}`}
            className="flex h-10 w-10 items-center justify-center text-xl font-bold text-zinc-400"
          >
            {day}
          </div>
        ))}
      </div>
      <div className="grid-rows-7 grid grid-flow-col gap-3">
        {summaryDates.map((date) => {
          return (
            <HabitDay
              key={date.toISOString()}
              activeProps={{
                total: 5,
                completed: Math.round(Math.random() * 5),
              }}
            />
          );
        })}

        {emptyDaysLeft > 0 &&
          Array.from({ length: emptyDaysLeft }).map((_, index) => (
            <HabitDay
              key={`empty-day-${index}`}
              className="cursor-not-allowed opacity-40"
            />
          ))}
      </div>
    </div>
  );
}
