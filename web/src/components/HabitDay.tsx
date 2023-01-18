import { HTMLAttributes } from 'react';

interface HabitDayProps extends HTMLAttributes<HTMLDivElement> {}

export function HabitDay({ className }: HabitDayProps) {
  return (
    <div
      className={`w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg ${
        className || ''
      }`}
    ></div>
  );
}
