import { ScrollView, ScrollViewProps } from 'react-native';

export function ScrollViewContainer({
  showsVerticalScrollIndicator = false,
  contentContainerStyle = { paddingBottom: 50 },
  ...props
}: ScrollViewProps) {
  return (
    <ScrollView
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      contentContainerStyle={contentContainerStyle}
      {...props}
    />
  );
}
