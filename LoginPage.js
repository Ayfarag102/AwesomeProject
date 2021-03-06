import React, { useState } from "react";
import {
  Button,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { firebase } from "./src/firebase/config";

const LoginPage = ({ navigation }) => {
  const styles = StyleSheet.create({
    // container: {
    //   // flex: 2,
    //   alignItems: "center",
    // },
    back__button: {
      backgroundColor: "rgba(241, 196, 15,1.0)",
      marginLeft: 30,
      marginRight: 30,
      marginTop: 20,
      height: 48,
      borderRadius: 5,
      alignItems: "center",
      justifyContent: "center",
    },
    back__button__title: {
      color: "white",
      fontSize: 16,
      fontWeight: "bold",
    },
    form__button: {
      backgroundColor: "rgba(46, 204, 113,1.0)",
      marginLeft: 30,
      marginRight: 30,
      marginTop: 20,
      height: 48,
      borderRadius: 5,
      alignItems: "center",
      justifyContent: "center",
    },
    form__button__title: {
      color: "white",
      fontSize: 16,
      fontWeight: "bold",
    },
    form__inputtext: {
      height: 48,
      borderRadius: 5,
      overflow: "hidden",
      backgroundColor: "white",
      marginTop: 10,
      marginBottom: 10,
      marginLeft: 30,
      marginRight: 30,
      paddingLeft: 16,
      borderWidth: 1,
      fontFamily: "Proxima Nova",
    },
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        const uid = response.user.uid;
        const usersRef = firebase.firestore().collection("users");
        usersRef
          .doc(uid)
          .get()
          .then((firestoreDocument) => {
            if (!firestoreDocument.exists) {
              alert("User does not exist");
              return;
            }
            const user = firestoreDocument.data();
            navigation.navigate("Home", { user });
          })
          .catch((err) => {
            alert(err);
          });
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.form__inputtext}
        value={email}
        placeholder="Enter your email"
        placeholderTextColor="#aaaaaa"
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.form__inputtext}
        value={password}
        placeholder="Enter your password"
        placeholderTextColor="#aaaaaa"
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity
        disabled={!email && !password}
        onPress={login}
        style={styles.form__button}
      >
        <Text style={styles.form__button__title}>
          Login <span>🙊</span>
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.back__button}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.back__button__title}>Go Back 🔙</Text>
      </TouchableOpacity>
      {/* <Button
        style={styles.back__button}
        title="Go Back 🔙"
        onPress={() => navigation.goBack()}
      /> */}
    </View>
  );
};

export default LoginPage;
