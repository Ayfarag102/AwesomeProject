import React from "react";
import { StyleSheet, Text, View } from "react-native";

const TrackIncome = ({ description, amount }) => {
  return (
    <View>
      <Text style={styles.titleText}> {description}</Text>
      <Text style={styles.titleText}>{amount}</Text>
    </View>
  );
};

export default TrackIncome;

const styles = StyleSheet.create({
  titleText: {
    fontFamily: "Lato",
  },
});
