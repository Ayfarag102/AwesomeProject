import React, { useState, useEffect } from "react";
import {
  Button,
  Dimensions,
  View,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import TrackIncome from "./trackIncome";
const App = () => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [total, setTotal] = useState(0);
  const [gigs, setGigs] = useState([
    {
      description: "Freelance @ Upworks",
      amount: 499.99,
    },
  ]);

  useEffect(() => {
    setTotal(gigs.reduce((total, gig) => total + Number(gig.amount), 0));
  }, [gigs]);
  const addGig = () => {
    setGigs([
      ...gigs,
      {
        description: description,
        amount: amount,
        timestamp: new Date(),
      },
    ]);

    setDescription("");
    setAmount("");
  };

  return (
    <SafeAreaView>
      <View style={styles.banner}>
        <Text style={styles.banner__titleText}>
          🚀🚀🚀 Track Income App 🚀🚀🚀
        </Text>
      </View>
      <Text style={styles.subtitleTexts}>Total Income: ${total}</Text>
      <View>
        <Text>Your Income</Text>
        <LineChart
          data={{
            labels: [
              "Dec 5/20",
              "Dec 6/20",
              "Dec 7/20",
              "Dec 8/20",
              "Dec 9/20",
              "Dec 10/20",
            ],
            datasets: [
              {
                data: [
                  total * 100,
                  total * 200,
                  total * 300,
                  total * 400,
                  total * 500,
                  total * 600,
                ],
              },
            ],
          }}
          width={Dimensions.get("window").width} // from react-native
          height={220}
          yAxisLabel="$"
          yAxisSuffix="k"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 1, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726",
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
            fontFamily: "Roboto",
          }}
        />
      </View>
      {/* <Todo title="Take bio out" />
      <Todo title="Code React (Native), Flutter" />
      <Todo title="Pray, Read, Dua" /> */}
      <TextInput
        style={styles.income__textinput}
        value={description}
        placeholder="Enter a Description"
        onChangeText={(text) => setDescription(text)}
      />
      <TextInput
        style={styles.income__textinput}
        value={amount}
        placeholder="Enter the amount you made in CAD ($)"
        keyboardType="numeric"
        onChangeText={(text) => setAmount(text)}
      />
      <Button
        disabled={!amount && !description}
        onPress={addGig}
        style={styles.addgig__btn}
        title="Add Gig 🚀"
      />
      {gigs.map((gig) => (
        <View>
          <Text style={styles.subtitleTexts}>{gig.description}</Text>
          <Text style={styles.subtitleTexts}>{gig.amount}</Text>
        </View>
      ))}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  banner__titleText: {
    color: "white",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    fontFamily: "Avenir Next Medium",
  },
  subtitleTexts: {
    fontFamily: "Lato",
  },
  income__textinput: {
    marginTop: 20,
    marginBottom: 10,

    height: 40,
    borderColor: "red",
    borderWidth: 1,
    fontFamily: "Proxima Nova",
  },
  // addgig__btn: {
  //   color: `rgba(46, 204, 113,1.0)`,
  // },
  banner: {
    backgroundColor: `#27ae60`,
  },
});

export default App;
