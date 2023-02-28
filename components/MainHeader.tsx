import { StyleSheet, Text, TouchableNativeFeedback, View } from "react-native";
import { Bell } from "react-native-feather";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { themes } from "../themes";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { impactAsync, ImpactFeedbackStyle } from "expo-haptics";

interface IMainHeaderProps {
  title: string;
}

const MainHeader = (props: IMainHeaderProps) => {
  const insets = useSafeAreaInsets();
  const pressed = useSharedValue(false);

  const uas = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withSpring(pressed.value ? 0.8 : 1, {
            damping: 10,
            stiffness: 350,
          })
        }
      ]
    };
  });

  const handlePressIn = () => {
    pressed.value = true;
  }

  const handlePressOut = () => {
    pressed.value = false;
    impactAsync(ImpactFeedbackStyle.Light);
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Text style={styles.title}>{props.title}</Text>
      <TouchableNativeFeedback
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}>
        <Animated.View style={uas}>
          <Bell
            width={themes.icon.size.header}
            height={themes.icon.size.header}
            color={"#727272"}/>
        </Animated.View>
      </TouchableNativeFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 7.5,
    paddingHorizontal: 25,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
  }
});

export default MainHeader;
