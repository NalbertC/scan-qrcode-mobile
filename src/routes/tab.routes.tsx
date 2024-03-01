import { Foundation, MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StackScreenProps } from "@react-navigation/stack";

import { RootStackParamList } from ".";

import { Tabs } from "~/components/Tabs";
import { Home } from "~/screens/Home";
import { Scan } from "~/screens/Scan";

const Tab = createBottomTabNavigator();

type Props = StackScreenProps<RootStackParamList, "TabNavigator">;

export function TabLayout({ navigation }: Props) {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="home"
      tabBar={(props) => <Tabs {...props} />}
    >
      <Tab.Screen
        name="scan"
        component={Scan}
        options={{
          title: "Scan",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="qrcode-scan"
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="home"
        component={Home}
        options={{
          title: "Início",
          tabBarIcon: ({ color }) => (
            <Foundation name="home" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
