import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from "@expo/vector-icons";
import { Button } from "react-native-paper";
import { SafeAreaView } from "react-navigation";

export default function Profile(props) {
  const [name, setName] = React.useState("");

  const handleLogOut = async () => {
    AsyncStorage.setItem("isLoggedIn", "False");
    props.navigation.navigate({routeName: 'Auth'})
  };

  useEffect(() => {
    const getName = async () => {
      const staff = await AsyncStorage.getItem("staffName");
      setName(staff);
    };
    getName();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, alignContent: "center" }}>
      <View
        style={{
          flexDirection: "row",
          paddingTop: 10,
        }}
      >
        <Button
          title="Go back"
          color="black"
          onPress={() => props.navigation.goBack()}
        >
          <AntDesign name="leftcircleo" size={24} color="black" />
        </Button>
      </View>
      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 20,
          backgroundColor: "white",
          marginLeft: 20,
          marginRight: 20,
          marginTop: 20,
          borderRadius: 10,
        }}
      >
        <Text
          style={{
            fontSize: 19,
            color: "black",
            textDecorationLine: "underline",
          }}
        >
          {name}
        </Text>

        <View style={styles.button}>
          <TouchableOpacity style={styles.signIn} onPress={handleLogOut}>
            <Text
              style={[
                styles.textSign,
                {
                  color: "#fff",
                },
              ]}
            >
              Log Out
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#009387",
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#009387",
    marginTop: 10,
  },

  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
  button: {
    paddingVertical: 10,
    paddingRight: 20,
    paddingLeft: 20,
    alignItems: "center",
  },
});
