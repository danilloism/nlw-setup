import React from 'react';
import { ScreenWrapper } from './ScreenWrapper';
import { useRoute } from '@react-navigation/native';
import { ScrollView, Text, View } from 'react-native';
import { ScrollViewContainer } from '../components/ScrollViewContainer';
import { BackButton } from '../components/BackButton';
import dayjs from 'dayjs';
import { ProgressBar } from '../components/ProgressBar';
import { Checkbox } from '../components/Checkbox';

interface HabitProps {
  date: string;
}

export function Habit() {
  const route = useRoute();
  const { date } = route.params as HabitProps;

  const parsedDate = dayjs(date);
  const dayOfWeek = parsedDate.format('dddd');
  const dayAndMonth = parsedDate.format('DD/MM');

  return (
    <ScreenWrapper>
      <ScrollViewContainer>
        <BackButton />

        <Text className="mt-6 text-zinc-400 font-semibold text-base lowercase">
          {dayOfWeek}
        </Text>

        <Text className="text-white font-extrabold text-3xl">
          {dayAndMonth}
        </Text>

        <ProgressBar progress={50} />

        <View className="mt-6">
          <Checkbox label="Beber 2L de água" />
        </View>
      </ScrollViewContainer>
    </ScreenWrapper>
  );
}
