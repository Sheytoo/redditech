import { StyleSheet, View } from "react-native";
import MainHeader from "../components/MainHeader";

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <MainHeader title={"Profile"}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f1f1",
  }
});

export default ProfileScreen;