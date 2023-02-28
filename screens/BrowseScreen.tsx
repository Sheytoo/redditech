import { StyleSheet, View } from "react-native";
import MainHeader from "../components/MainHeader";
import SearchInput from "../components/SearchInput";

const BrowseScreen = () => {
  return (
    <View style={styles.container}>
      <MainHeader title={"Browse"}/>
      <SearchInput/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f1f1",
  }
});

export default BrowseScreen;
