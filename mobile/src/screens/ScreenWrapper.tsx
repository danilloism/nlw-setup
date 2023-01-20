import { View, ViewProps } from 'react-native';
import { cn } from '../utils/style-utils';

interface ScreenProps extends ViewProps {}

export function ScreenWrapper({ className, ...props }: ScreenProps) {
  return (
    <View
      className={cn('flex-1 bg-background px-8 pt-16', className)}
      {...props}
    />
  );
}
