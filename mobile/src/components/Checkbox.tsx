import {
  Text,
  TouchableOpacity,
  View,
  TouchableOpacityProps,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import colors from 'tailwindcss/colors';
import { cn } from '../utils/style-utils';

interface CheckboxProps extends TouchableOpacityProps {
  checked?: boolean;
  label: string;
}

export function Checkbox({ checked = false, label, ...props }: CheckboxProps) {
  const commonClasses = 'h-8 w-8 rounded-lg';

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className="flex-row mb-2 items-center"
      {...props}
    >
      {checked ? (
        <View
          className={cn(
            commonClasses,
            'bg-green-500 items-center justify-center'
          )}
        >
          <Feather
            name="check"
            size={20}
            color={colors.white}
          />
        </View>
      ) : (
        <View className={cn(commonClasses, 'bg-zinc-800')}></View>
      )}

      <Text className="text-white ml-3 font-semibold">{label}</Text>
    </TouchableOpacity>
  );
}
