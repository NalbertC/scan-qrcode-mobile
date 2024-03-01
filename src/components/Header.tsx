import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface HeaderProps { }

export function Header({ }: HeaderProps) {
  const insets = useSafeAreaInsets();

  return (
    <View className="bg-primary " style={{ paddingTop: insets.top }}>
      <View className=" h-20" />
    </View>
  );
}
