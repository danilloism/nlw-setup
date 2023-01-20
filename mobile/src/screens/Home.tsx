import { View, Text, ScrollView } from 'react-native';
import { HabitDay, DAY_SIZE } from '../components/HabitDay';
import { Header } from '../components/Header';
import { ScrollViewContainer } from '../components/ScrollViewContainer';
import { generateRangeDatesFromYearStart } from '../utils/date.utils';
import { ScreenWrapper } from './ScreenWrapper';
import { useNavigation } from '@react-navigation/native';

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
const dates = generateRangeDatesFromYearStart();
const minimumSummaryDatesSize = 18 * 5;
const emptyDaysLeft = minimumSummaryDatesSize - dates.length;

export function Home() {
  const { navigate } = useNavigation();

  return (
    <ScreenWrapper>
      <Header />
      <View className="flex-row mt-6 mb-2">
        {weekDays.map((day, index) => (
          <Text
            key={`week-day-${day}-${index}`}
            className="text-zinc-400 text-xl font-bold text-center mx-1"
            style={{ width: DAY_SIZE }}
          >
            {day}
          </Text>
        ))}
      </View>
      <ScrollViewContainer>
        <View className="flex-row flex-wrap">
          {dates.map(date => (
            <HabitDay
              key={date.toISOString()}
              onPress={() => navigate('habit', { date: date.toISOString() })}
            />
          ))}
          {emptyDaysLeft > 0 &&
            Array.from({ length: emptyDaysLeft }).map((_, index) => (
              <HabitDay
                active={false}
                key={`empty-day-${index}`}
              />
            ))}
        </View>
      </ScrollViewContainer>
    </ScreenWrapper>
  );
}
