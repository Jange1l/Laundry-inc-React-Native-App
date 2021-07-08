import React from "react";
import { View, Image, Text } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";

export default function TaskItem(props) {
  console.log("task  ittem  created");
  //console.log(props)
  const handlePress = () => {
    console.log(props.data);
    props.navigation.navigate({
      routeName: "TaskDetail",
      params: {
        taskName: props.data.taskName,
        taskDescription: props.data.taskDescription,
        taskId: props.data._id,
        conversationId: props.data.messagesId,
        category: props.data.category,
        status: props.data.status
      },
    });
  };

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

  function StatusBar(p) {
    if (p.status === "Pending") {
      return (
        <View
          style={{
            backgroundColor: "#f50057",
            width: 15,
            flexDirection: "column",
            borderTopLeftRadius: 15,
            borderBottomLeftRadius: 15,
            height: 120,
            marginRight: 5
          }}
        />
      );
    } else {
      return (
        <View
          style={{
            backgroundColor: "#4caf50",
            width: 15,
            flexDirection: "column",
            borderTopLeftRadius: 15,
            borderBottomLeftRadius: 15,
            height: 120,
            marginRight: 5,
          }}
        />
      );
    }
  }
  return (
    <View
      style={{
        backgroundColor: "#FEFEFE",
        height: 120,
        width: "90%",
        borderRadius: 15,
        marginVertical: 20,
        // borderWidth: 1,
        borderColor: "black",
        // justifyContent: "center",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          borderRadius: 15,
          height: 120,
          width: "90%",
        }}
      >
        <StatusBar status={props.data.status} />
        <View
          style={{
            flexDirection: "column",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity onPress={handlePress}>
            <Text
              style={{
                fontSize: 17,
                color: "black",
              }}
            >
              {props.data.taskName}
            </Text>
            <View
              style={{
                flexDirection: "row",
                width: 250,
                alignItems: "center",
              }}
            >
              <View
                style={{
                  paddingHorizontal: 5,
                  paddingVertical: 5,
                  width: 250,
                }}
              >
                <Text
                  numberOfLines={3}
                  style={{
                    fontSize: 15,
                    color: "dimgray",
                  }}
                >
                  {props.data.taskDescription}
                </Text>
              </View>
              <CategoryIcon name={props.data.category} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
