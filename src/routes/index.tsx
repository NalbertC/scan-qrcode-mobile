import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { TabLayout } from "~/routes/tab.routes";
import Modal from "~/screens/Modal";

export type RootStackParamList = {
  Modal: undefined;
  TabNavigator: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function RootStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="TabNavigator"
          component={TabLayout}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Modal"
          component={Modal}
          options={{ presentation: "modal", headerLeft: () => null }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
