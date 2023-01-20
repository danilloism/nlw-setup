import {
  TouchableOpacity,
  Dimensions,
  View,
  TouchableOpacityProps,
} from 'react-native';
import { cn } from '../utils/style-utils';

const WEEK_DAYS = 7;
const SCREEN_HORIZONTAL_PADDING = (32 * 2) / 5;

export const DAY_MARGIN_BETWEEN = 8;
export const DAY_SIZE =
  Dimensions.get('screen').width / WEEK_DAYS - (SCREEN_HORIZONTAL_PADDING + 5);

interface HabitDayProps extends TouchableOpacityProps {
  active?: boolean;
}

export function HabitDay({ active = true, ...activeProps }: HabitDayProps) {
  const className = cn(
    'rounded-lg border-2 m-1 border-zinc-800',
    'bg-zinc-900',
    {
      'opacity-40': !active,
    }
  );

  if (active) {
    return (
      <TouchableOpacity
        className={className}
        style={{ width: DAY_SIZE, height: DAY_SIZE }}
        activeOpacity={0.7}
        {...activeProps}
      />
    );
  }

  return (
    <View
      className={className}
      style={{ width: DAY_SIZE, height: DAY_SIZE }}
    ></View>
  );
}
