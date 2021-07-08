import { FontDisplay } from "expo-font";
import { StatusBar } from "expo-status-bar";
import React, {useState} from "react";
import { StyleSheet, Text, View } from "react-native";

import TasksNavigator from "./navigation/TasksNavigator";
import NavigationContainer from "./navigation/NavigationContainer";
import { AppLoading } from "expo";
import Login from "./screens/Login";


export default function App() {
  const isLoggedIn = false;
  
  return <TasksNavigator />;
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
