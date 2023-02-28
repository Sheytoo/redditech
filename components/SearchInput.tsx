import { StyleSheet, TextInput, View } from "react-native";
import { Search } from "react-native-feather";

const SearchInput = () => {
  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <View style={styles.search}>
          <Search stroke="#000" width={24} height={24}/>
        </View>
        <TextInput
          style={styles.field}
          placeholder="Search..."
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    paddingTop: 20,
    paddingBottom: 15,
  },
  inner: {
    flexDirection: "row",
  },
  search: {
    position: "absolute",
    top: 15,
    left: 15,
    zIndex: 1,
  },
  field: {
    backgroundColor: "#fff",
    paddingLeft: 50,
    paddingRight: 20,
    paddingVertical: 10,
    borderRadius: 15,
    height: 54,
    flex: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.07,
    shadowRadius: 2.5,
  },
});

export default SearchInput;
