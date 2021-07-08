import React, { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StyleSheet, View, Text } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Button } from "react-native-paper";

import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";


export default function TaskDetail(props) {
  const taskName = props.navigation.getParam("taskName");
  const taskDescription = props.navigation.getParam("taskDescription");
  const taskId = props.navigation.getParam("taskId");
  const conversationId = props.navigation.getParam("conversationId");
  const category = props.navigation.getParam("category")
  const status = props.navigation.getParam("status");

  const [messages, setMessages] = useState([]);

  const [completed, setCompleted] = useState('');

  const handlePress = () => {
    // console.log(props.data);
    props.navigation.navigate({
      routeName: "ConversationScreen",
      params: {
        taskName: taskName,
        taskDescription: taskDescription,
        taskId: taskId,
        conversationId: conversationId,
        
      },
    });
  };

  const completeTask = async () => {
    console.log(taskId);
    try {
      const res = await axios.post(
        `http://localhost:8080/tasks/completeTask/:${taskId}`
      );
      setCompleted("Completed")
    } catch (err) {}
  };

  function CompleteButton(p) {
    let stat = p.status;
    if (p.t === "Completed") {
      stat = "Completed"
    }
    if (stat === "Pending") {
      return (
        <TouchableOpacity style={styles.completeTask} onPress={completeTask}>
          <Text
            style={[
              styles.textSign,
              {
                color: "#4caf50",
              },
            ]}
          >
            Complete Task
          </Text>
          
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity style={styles.completed}>
          <Text
            style={[
              styles.textSign,
              {
                color: "white",
              },
            ]}
          >
            Task Completed
          </Text>
          <Feather name="check-circle" size={24} color="black" />
        </TouchableOpacity>
      );
    }
    
  }
  function CategoryIcon(p) {
    console.log(p);
    switch (p.name) {
      case "Car":
        return <Icon name="car" color="#5facdb" size={32} />;

      case "Apartment":
        return <MaterialIcons name="apartment" size={32} color="#ff5c83" />;
      case "Bus":
        return <Icon name="bus" color="#ffa06c" size={32} />;
      case "Laundry":
        return (
          <MaterialIcons
            name="local-laundry-service"
            size={32}
            color="#bb32fe"
          />
        );
      default:
        return <MaterialIcons name="bathtub" size={32} color="#4caf50" />;
    }
  }
  return (
    <View style={{ backgroundColor: "grey", flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          paddingTop: 40,
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
          flexDirection: "row",
          marginRight: 20,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontSize: 40,
            color: "white",
          }}
        >
          {taskName}
        </Text>

        <CategoryIcon name={category}/>
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
          Task Description
        </Text>
        <Text
          style={{
            fontSize: 15,
            color: "black",
          }}
        >
          {taskDescription}
        </Text>
        <View style={styles.button}>
          <CompleteButton t={completed} status={status}/>
        </View>
        <View style={styles.button}>
          <TouchableOpacity style={styles.signIn} onPress={handlePress}>
            <Text
              style={[
                styles.textSign,
                {
                  color: "#fff",
                },
              ]}
            >
              Open Conversation
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderColor: "white",
    marginBottom: 10,
  },
  completeTask: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderColor: "#4caf50",
    borderWidth: 1,
  },
  completed: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#4caf50",
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#009387",
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
  scrollView: {
    width: "100%",
    alignSelf: "center",
    height: "70%",
  },
  button: {
    paddingVertical: 10,
  },
});
