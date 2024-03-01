import { StatusBar } from "react-native";
import "react-native-gesture-handler";
import "./global.css";

import RootStack from "~/routes";

export default function App() {
  return (
    <>
      <RootStack />
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
    </>
  );
}
