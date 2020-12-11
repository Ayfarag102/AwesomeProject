import React, { useState } from "react";
import { Button, View, Text, TextInput, StyleSheet } from "react-native";

const LoginPage = ({ navigation }) => {
  const styles = StyleSheet.create({
    form__inputtext: {
      marginTop: 20,
      marginBottom: 10,

      height: 40,
      borderColor: "black",
      borderWidth: 1,
      fontFamily: "Proxima Nova",
    },
  });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    if (username === "alkashif" && password === "admin123") {
      navigation.navigate("Home");
    }
  };
  return (
    <View>
      <TextInput
        style={styles.form__inputtext}
        value={username}
        placeholder="Enter your username"
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.form__inputtext}
        value={password}
        placeholder="Enter your password"
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
      />
      <Button
        disabled={!username && !password}
        onPress={login}
        color="rgba(46, 204, 113,1.0)"
        title="Login 🙊"
      />
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default LoginPage;
