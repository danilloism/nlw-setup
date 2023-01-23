import * as cb from '@radix-ui/react-checkbox';
import { Check } from 'phosphor-react';
import { cn } from '../utils/style-utils';

interface CheckboxProps extends cb.CheckboxProps {
  label?: string;
  labelOptions?: {
    bold?: boolean;
    lineThrough?: boolean;
  };
}

export function Checkbox({ label, labelOptions, ...props }: CheckboxProps) {
  return (
    <cb.Root
      className="group flex items-center gap-3"
      {...props}
    >
      <div className="flex h-8 w-8 items-center justify-center rounded-lg border-2 border-zinc-800 bg-zinc-900 group-data-[state=checked]:border-green-500 group-data-[state=checked]:bg-green-500">
        <cb.Indicator>
          <Check
            size={20}
            className="text-white"
          />
        </cb.Indicator>
      </div>
      <span
        className={cn('leading-tight text-white', {
          'group-data-[state=checked]:text-zinc-400 group-data-[state=checked]:line-through':
            labelOptions?.lineThrough,
          'text-xl font-semibold': labelOptions?.bold,
        })}
      >
        {label}
      </span>
    </cb.Root>
  );
}
