import { View } from "react-native";

import { Scanner } from "~/components/Scanner";

export function Scan() {
  return (
    <View className="flex-1 justify-center">
      <Scanner />
    </View>
  );
}
