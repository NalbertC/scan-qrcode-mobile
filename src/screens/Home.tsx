import { View } from "react-native";

import { Header } from "~/components/Header";
import { ItemScaned } from "~/components/ItemScaned";

export function Home() {
  return (
    <View className="flex-1  bg-blue-50">
      <Header />
      <ItemScaned />
    </View>
  );
}
