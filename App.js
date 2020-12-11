import React from "react";
import Homepage from "./Homepage";
//import MessagesPage from "./MessagesPage";
import LoginPage from "./LoginPage";

//import { SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Homepage} />
        <Stack.Screen
          name="Login"
          component={LoginPage}
          options={{ title: "Sign In or Sign Up" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
