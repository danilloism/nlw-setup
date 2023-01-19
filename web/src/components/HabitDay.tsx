import { HTMLAttributes } from 'react';
import * as Popover from '@radix-ui/react-popover';
import { ProgressBar } from './ProgressBar';
import { cn } from '../utils/style-utils';

interface ActiveHabitDay {
  completed: number;
  total: number;
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

  const completedPercentage = Math.round(
    (activeProps.completed / activeProps.total) * 100
  );
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
          <span className="font-semibold text-zinc-400">segunda-feira</span>
          <span className="mt-1 text-3xl font-extrabold leading-tight">
            19/01
          </span>
          <ProgressBar currentProgress={completedPercentage} />
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
