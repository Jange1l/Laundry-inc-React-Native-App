import React, { useEffect, useState } from "react";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { MaterialIcons } from "@expo/vector-icons";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { StyleSheet, View, Text } from "react-native";

import axios from "axios";

import TaskItemsView from "../components/TaskItemsView";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Feather } from "@expo/vector-icons";

export default function Home(navigation) {
  let [taskData, setTaskData] = useState(["nothing yet"]);
  const [ogData, setOgData] = useState("");
  const [staffName, setStaff] = useState("");
  const [tasksShowing, setTasksShowing] = useState("Pending Tasks");

  //console.log(navigation)
  useEffect(() => {
    //Save staff name at log in

    const fetchTaskData = async () => {
      const staff = await AsyncStorage.getItem("staffName");
      console.log(staff);
      setStaff(staff);
      const res = await axios.get(
        `http://127.0.0.1:8080/tasks/staffTasks/:${staff}`
      );
      console.log("Fetch Tasks called");

      setTaskData(res.data.tasks.filter((t) => t.status === "Pending"));
      setOgData(res.data.tasks);
    };

    fetchTaskData();
  }, []);

  const refresh = async () => {
    const staff = await AsyncStorage.getItem("staffName");
    console.log('Refresh called')
    const res = await axios.get(
      `http://127.0.0.1:8080/tasks/staffTasks/:${staff}`
    );
    console.log("Refresh completed");
    setTaskData(res.data.tasks.filter((t) => t.status === "Pending"));
    setOgData(res.data.tasks);
    setTasksShowing("Pending Tasks")
  };

  function CategorySort(p) {
    taskData = ogData;
    let td;
    if (p === "Completed") {
      td = taskData.filter((t) => t.status === p);
      setTasksShowing("Completed Tasks");
    } else {
      setTasksShowing("Pending Tasks");
      td = taskData.filter((t) => t.category === p);
      td = td.filter(t => t.status === "Pending");
    }
    setTaskData(td);
  }

  function allCategories() {
    console.log("all selected");
    setTasksShowing('All Tasks')
    setTaskData(ogData);
  }

  return (
    <View style={{ backgroundColor: "grey" }}>
      <View
        style={{
          paddingHorizontal: 20,
          flexDirection: "row",
          marginTop: 20,
          marginRight: 20,
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: 40,
        }}
      >
        <Text
          style={{
            fontSize: 40,
            color: "white",
          }}
        >
          {staffName}
        </Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigation.navigate({ routeName: "Profile" })
          }
        >
          <Icon name="account-circle" size={33} color="#a2a2db" />
        </TouchableOpacity>
      </View>

      <View style={{ paddingHorizontal: 20, paddingVertical: 20 }}>
        <Text
          style={{
            fontSize: 17,
            color: "white",
          }}
        >
          Categories
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginRight: -40, marginTop: 30 }}
        >
          <TouchableOpacity
            onPress={() => CategorySort("Completed")}
            style={{
              alignItems: "center",
              justifyContent: "center",
              height: 66,
              width: 66,
              borderRadius: 50,
              backgroundColor: "#4caf50",
              marginLeft: 22,
            }}
          >
            <Feather name="check-circle" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => allCategories()}
            style={{
              alignItems: "center",
              justifyContent: "center",
              height: 66,
              width: 66,
              borderRadius: 50,
              backgroundColor: "#ff5c83",
              marginHorizontal: 22,
            }}
          >
            <Text
              style={{
                fontSize: 25,
                color: "white",
              }}
            >
              All
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => CategorySort("Car")}
            style={{
              alignItems: "center",
              justifyContent: "center",
              height: 66,
              width: 66,
              borderRadius: 50,
              backgroundColor: "#5facdb",
            }}
          >
            <Icon name="car" color="white" size={32} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => CategorySort("Apartment")}
            style={{
              alignItems: "center",
              justifyContent: "center",
              height: 66,
              width: 66,
              borderRadius: 50,
              backgroundColor: "#ff5c83",
              marginHorizontal: 22,
            }}
          >
            <MaterialIcons name="apartment" size={32} color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => CategorySort("Bus")}
            style={{
              alignItems: "center",
              justifyContent: "center",
              height: 66,
              width: 66,
              borderRadius: 50,
              backgroundColor: "#ffa06c",
            }}
          >
            <Icon name="bus" color="white" size={32} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => CategorySort("Laundry")}
            style={{
              alignItems: "center",
              justifyContent: "center",
              height: 66,
              width: 66,
              borderRadius: 50,
              backgroundColor: "#bb32fe",
              marginLeft: 22,
            }}
          >
            <MaterialIcons
              name="local-laundry-service"
              size={32}
              color="white"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => CategorySort("Bath Tub")}
            style={{
              alignItems: "center",
              justifyContent: "center",
              height: 66,
              width: 66,
              borderRadius: 50,
              backgroundColor: "#4caf50",
              marginLeft: 22,
            }}
          >
            <MaterialIcons name="bathtub" size={32} color="white" />
          </TouchableOpacity>
        </ScrollView>

        <Text
          style={{
            color: "white",

            marginTop: 20,
            fontSize: 17,
          }}
        >
          {tasksShowing}
        </Text>

        {taskData ? (
          <TaskItemsView refresh={refresh} navigation={navigation.navigation} data={taskData} />
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    height: "70%",
    width: "100%",
    alignSelf: "center",
    // backgroundColor: 'lightblue'
  },
  contentContainer: {
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: 'lightgrey',
  },
  text: {
    fontSize: 42,
  },
});
