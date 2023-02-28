import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import BrowseScreen from "../screens/BrowseScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { Home, Search, User } from "react-native-feather";
import { Dimensions, StyleSheet } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { themes } from "../themes";

const Tab = createBottomTabNavigator();

const tabs = [
  {
    name: "Home",
    component: HomeScreen,
    icon: <Home width={themes.icon.size.menu} height={themes.icon.size.menu} color={themes.colors.primary}/>,
    activeIcon: <Home width={themes.icon.size.menu} height={themes.icon.size.menu} color={themes.colors.secondary}/>
  },
  {
    name: "Browse",
    component: BrowseScreen,
    icon: <Search width={themes.icon.size.menu} height={themes.icon.size.menu} color={themes.colors.primary}/>,
    activeIcon: <Search width={themes.icon.size.menu} height={themes.icon.size.menu} color={themes.colors.secondary}/>
  },
  {
    name: "Profile",
    component: ProfileScreen,
    icon: <User width={themes.icon.size.menu} height={themes.icon.size.menu} color={themes.colors.primary}/>,
    activeIcon: <User width={themes.icon.size.menu} height={themes.icon.size.menu} color={themes.colors.secondary}/>
  }
];

const TabNavigator = () => {
  const offset = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withSpring(offset.value, {
            damping: 22.5,
            stiffness: 275,
          })
        }
      ]
    };
  });

  return (
    <>
      <Tab.Navigator
        initialRouteName={"Home"}
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
        }}>
        {tabs.map((tab, index) => {
          return (
            <Tab.Screen
              key={index}
              name={tab.name}
              component={tab.component}
              options={{
                tabBarIcon: ({ focused }) => {
                  return focused ? tab.activeIcon : tab.icon;
                },
              }}
              listeners={{
                tabPress: () => {
                  offset.value = Dimensions.get("window").width / tabs.length * index;

                }
              }}
            />
          );
        })}
      </Tab.Navigator>
      <Animated.View style={[styles.indicator, animatedStyle]} />
    </>
  );
}

const styles = StyleSheet.create({
  indicator: {
    position: "absolute",
    width: 10,
    height: 2,
    borderRadius: 5,
    left: Dimensions.get("window").width / tabs.length / 2 - 5,
    bottom: 30,
    backgroundColor: themes.colors.secondary,
    zIndex: 100,
  }
});

export default TabNavigator;
