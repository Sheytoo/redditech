import { ScrollView, StyleSheet, View } from "react-native";
import PillButton from "./PillButton";
import { useState } from "react";

export enum Category {
  BEST = "Best",
  HOT = "Hot",
  NEW = "New",
  TOP = "Top",
}

interface ICategorySelectorProps {
  category: Category;
  setCategory: (category: Category) => void;
}

const CategorySelector = (props: ICategorySelectorProps) => {
  return (
    <View style={styles.categoryContainer}>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20 }}>
        {Object.keys(Category).map((key) => (
          <PillButton
            key={key}
            title={Category[key]}
            active={props.category === Category[key]}
            onPress={() => props.setCategory(Category[key])}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  categoryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  }
});

export default CategorySelector;
