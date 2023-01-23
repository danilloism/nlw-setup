import { HTMLAttributes } from 'react';
import * as Popover from '@radix-ui/react-popover';
import { ProgressBar } from './ProgressBar';
import { cn } from '../utils/style-utils';
import { Checkbox } from './Checkbox';
import dayjs from 'dayjs';

interface ActiveHabitDay {
  completed?: number;
  total?: number;
  date: Date;
}

interface HabitDayProps extends HTMLAttributes<HTMLDivElement> {
  activeProps?: ActiveHabitDay;
}

export function HabitDay({ className, activeProps }: HabitDayProps) {
  const style = cn(
    'h-10 w-10',
    'bg-zinc-900',
    'rounded-lg border-2 border-zinc-800',
    className
  );

  if (!activeProps) {
    return <div className={style} />;
  }

  const { completed = 0, date, total = 0 } = activeProps;

  const completedPercentage =
    total > 0 ? Math.round((completed / total) * 100) : 0;

  const dayAndMonth = dayjs(date).format('DD/MM');
  const dayOfWeek = dayjs(date).format('dddd');

  return (
    <Popover.Root>
      <Popover.Trigger
        className={cn(style, {
          'bg-violet-900 border-violet-700':
            completedPercentage > 0 && completedPercentage < 20,
          'bg-violet-800 border-violet-600':
            completedPercentage >= 20 && completedPercentage < 40,
          'bg-violet-700 border-violet-500':
            completedPercentage >= 40 && completedPercentage < 60,
          'bg-violet-600 border-violet-500':
            completedPercentage >= 60 && completedPercentage < 80,
          'bg-violet-500 border-violet-400': completedPercentage >= 80,
        })}
      />

      <Popover.Portal>
        <Popover.Content className="flex  min-w-[320px] flex-col rounded-2xl bg-zinc-900 p-6">
          <span className="font-semibold text-zinc-400">{dayOfWeek}</span>
          <span className="mt-1 text-3xl font-extrabold leading-tight">
            {dayAndMonth}
          </span>
          <ProgressBar currentProgress={completedPercentage} />
          <div className="mt-6 flex flex-col gap-3">
            <Checkbox
              label="Teste testando"
              labelOptions={{ bold: true, lineThrough: true }}
            />
          </div>

          <Popover.Arrow
            height={8}
            width={16}
            className="fill-zinc-900"
          />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
