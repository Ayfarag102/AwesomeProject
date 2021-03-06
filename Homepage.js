import React, { useState, useEffect } from "react";
import {
  Button,
  Dimensions,
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import moment from "moment";
import { LineChart } from "react-native-chart-kit";

//  Problem Solving: dataset needs to be in a state (variable)
const styles = StyleSheet.create({
  banner__titleText: {
    color: "white",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    fontFamily: "Avenir Next Medium",
  },
  login__button: {
    backgroundColor: "rgba(52, 152, 219,1.0)",
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    height: 48,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  login__button__title: {
    color: "white",
    fontSize: 16,
    fontFamily: "Brut Gothic",
    fontWeight: "bold",
    shadowColor: "black",
  },

  register__button: {
    backgroundColor: "rgba(26, 188, 156,1.0)",
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    height: 48,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  register__button__title: {
    color: "white",
    fontSize: 16,

    fontFamily: "Brut Gothic",
    fontWeight: "bold",
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

  //rgba(22, 160, 133,1.0)
});
const Homepage = ({ navigation, props }) => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [total, setTotal] = useState(0);
  const [labels, setLabels] = useState([]);
  const [data, setData] = useState([
    {
      date: moment().format("LL"),
      amount: 2000,
    },
    { date: moment().subtract(1, "days").format("LL"), amount: 2500 },
    { date: moment().subtract(1, "days").format("LL"), amount: 3500 },
    { date: moment().subtract(1, "days").format("LL"), amount: 3500 },
    { date: moment().subtract(1, "days").format("LL"), amount: 3500 },
    { date: moment().subtract(7, "days").format("LL"), amount: 3500 },
    { date: moment().subtract(6, "days").format("LL"), amount: 3500 },
    { date: moment().subtract(5, "days").format("LL"), amount: 3500 },
    { date: moment().subtract(4, "days").format("LL"), amount: 3500 },
    { date: moment().subtract(3, "days").format("LL"), amount: 4500 },
    { date: moment().subtract(2, "days").format("LL"), amount: 5500 },
    { date: moment().subtract(2, "days").format("LL"), amount: 5500 },
  ]);
  //  sort to dates, hook to form, connect to firebase 🔥
  const [transformedData, setTransformedData] = useState([]);
  useEffect(() => {
    setTransformedData(transformData(groupBy(data, "date")));
  }, [data]);
  const [gigs, setGigs] = useState([
    {
      description: "Freelance @ Upworks",
      amount: 499.99,
      date: new Date(),
    },
  ]);
  //  Expected Output: [ date1, date2, date3, date4, date5 ]
  console.log("DEBUG 🔥", data);

  const getDates = () => transformedData.map((pair) => pair.date);
  console.log("The Dates ⏲", getDates());

  const getAmounts = () => transformedData.map((pair) => pair.amount);
  console.log("The Amounts 💰", getAmounts());

  const groupBy = (array, key) =>
    array.reduce((rv, x) => {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  console.log(
    "The GROUPED values are 🎯",
    Object.entries(groupBy(data, "date"))
  );

  const transformData = (groupedData) => {
    const transformedArray = [];

    Object.entries(groupedData).forEach((entry) => {
      const total = entry[1].reduce((total, pair) => total + pair.amount, 0);
      transformedArray.push({
        date: moment(entry[0]).format("MM/DD"),
        amount: total,
      });
    });
    const sortedArray = transformedArray.sort((a, b) =>
      moment(a["date"]).diff(moment(b["date"]))
    );

    console.log("Sorted:\n", sortedArray);
    return sortedArray;
    //["December 7, 2020", [{...}{...}]]
  };
  console.log(
    "The TOTAL grouped values are 👽 ",
    transformData(groupBy(data, "date"))
  );

  const addGig = () => {
    setGigs([
      ...gigs,
      {
        description: description,
        amount: amount,
      },
    ]);

    setData([
      ...data,
      {
        date: moment().format("LL"),
        amount: Number(amount),
      },
    ]);

    setDescription("");
    setAmount("");
  };
  useEffect(() => {
    setTotal(gigs.reduce((total, gig) => total + Number(gig.amount), 0));
  }, [gigs]);

  return (
    <SafeAreaView>
      <View style={styles.banner}>
        <Text style={styles.banner__titleText}>
          🚀🚀🚀 Track Income App 🚀🚀🚀
        </Text>
      </View>
      {/*Login Button*/}
      <TouchableOpacity
        onPress={() => navigation.navigate("Login")}
        style={styles.login__button}
      >
        <Text style={styles.login__button__title}>
          Login <span>💵</span>
        </Text>
      </TouchableOpacity>
      {/*Register Button*/}
      <TouchableOpacity
        onPress={() => navigation.navigate("Register")}
        style={styles.register__button}
      >
        <Text style={styles.register__button__title}>
          Register <span>💸</span>
        </Text>
      </TouchableOpacity>

      {/* <Button
        title="Login 💵"
        onPress={() => navigation.navigate("Register")}
      /> */}
      {/* <Button
        title="Register 💸"
        onPress={() => navigation.navigate("Register")}
      /> */}
      <View>
        <Text>Your Income</Text>
        <LineChart
          data={{
            labels: getDates(),
            datasets: [
              {
                data: getAmounts(),
              },
            ],
          }}
          width={Dimensions.get("window").width} // from react-native
          height={220}
          yAxisLabel="$"
          //yAxisSuffix="k"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "green",
            backgroundGradientTo: "green",
            decimalPlaces: null, // optional, defaults to 2dp
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
      <Text style={styles.subtitleTexts}>
        Total Income: ${total.toFixed(2)}
      </Text>

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
        color="rgba(46, 204, 113,1.0)"
        title="Add Gig 🚀"
      />
      {gigs.map((gig) => (
        <View>
          <Text style={styles.subtitleTexts}>{gig.description}</Text>
          <Text style={styles.subtitleTexts}>${gig.amount}</Text>
        </View>
      ))}
    </SafeAreaView>
  );
};

export default Homepage;
