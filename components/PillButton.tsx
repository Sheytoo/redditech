import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { themes } from "../themes";

interface IPillButtonProps {
  title: string;
  active?: boolean;
  onPress: () => void;
}

const PillButton = (props: IPillButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={props.onPress}
      style={[styles.container, props.active && styles.activeContainer]}>
      <Text style={[styles.title, props.active && styles.activeTitle]}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E6E6E6",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 50,
    marginRight: 10,
  },
  title: {
    color: "#B4B4B4",
    fontSize: 14,
    fontWeight: "700",
  },
  activeContainer: {
    backgroundColor: themes.colors.secondary,
  },
  activeTitle: {
    color: "#fff",
  }
});

export default PillButton;
