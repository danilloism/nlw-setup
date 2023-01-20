import { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity } from 'react-native';
import { BackButton } from '../components/BackButton';
import { Checkbox } from '../components/Checkbox';
import { cn } from '../utils/style-utils';
import { ScreenWrapper } from './ScreenWrapper';
import { Feather } from '@expo/vector-icons';
import colors from 'tailwindcss/colors';
import { ScrollViewContainer } from '../components/ScrollViewContainer';

const availableWeekDays = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
] as const;

export function New() {
  const titleClassName = 'mt-6 text-white font-extrabold text-3xl';
  const subTitleClassName = cn(titleClassName, 'font-semibold', 'text-base');

  const [checkedDays, setCheckedDays] = useState<number[]>([]);

  function handleToggleWeekDay(weekDay: number) {
    if (checkedDays.includes(weekDay)) {
      setCheckedDays(days => days.filter(day => day != weekDay));
      return;
    }

    setCheckedDays([...checkedDays, weekDay]);
  }

  return (
    <ScreenWrapper>
      <ScrollViewContainer>
        <BackButton />
        <Text className={titleClassName}>Criar hábito</Text>

        <Text className={subTitleClassName}>Qual seu compromentimento?</Text>
        <TextInput
          className="h-12 pl-4 rounded-lg mt-3 bg-zinc-900 text-white border-2 border-zinc-800 focus:border-green-600"
          placeholder="Exercícios, dormir bem, etc..."
          placeholderTextColor={colors.zinc[400]}
        />

        <Text className={cn(subTitleClassName, 'mt-4 mb-3')}>
          Qual a recorrência?
        </Text>
        {availableWeekDays.map((day, index) => (
          <Checkbox
            key={day}
            label={day}
            checked={checkedDays.some(checkedDay => checkedDay == index)}
            onPress={() => handleToggleWeekDay(index)}
          />
        ))}

        <TouchableOpacity
          activeOpacity={0.7}
          className="w-full h-14 flex-row items-center justify-center bg-green-600 rounded-md mt-6"
        >
          <Feather
            name="check"
            size={20}
            color={colors.white}
          />
          <Text className={cn(subTitleClassName, 'mt-0 ml-2')}>Confirmar</Text>
        </TouchableOpacity>
      </ScrollViewContainer>
    </ScreenWrapper>
  );
}
