import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Pressable, View } from "react-native";
import colors from "tailwindcss/colors";

interface TabsProps extends BottomTabBarProps { }

export function Tabs({ state, descriptors, navigation }: TabsProps) {
  return (
    <View className="flex-row h-20 bg-white rounded-t-lg pb-3">
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const tabBarIcon = options.tabBarIcon;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <Pressable
            key={`${route}+${index}`}
            onPress={onPress}
            className={`flex-1 items-center justify-center ${!isFocused && "scale-95"} ${isFocused && "scale-105"} `}
          >
            {tabBarIcon &&
              tabBarIcon({
                focused: isFocused,
                size: 24,
                color: isFocused ? "#0D366C" : colors.gray[400],
              })}
          </Pressable>
        );
      })}
    </View>
  );
}
