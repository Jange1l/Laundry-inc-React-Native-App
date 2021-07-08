import React from "react";
import { View, Text, RefreshControl } from "react-native";
import TaskItem from "./TaskItem";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { StyleSheet, Image, ImageBackground, TextInput } from "react-native";

export default function TaskItemsView(props) {
  const [refreshing, setRefreshing] = React.useState(false);

  const data = props.data;
  console.log(data);
  
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    props.refresh();
    setRefreshing(false);
  })
  return (
    <ScrollView
      vertical
      style={styles.scrollView}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
        onRefresh={onRefresh} />
      }
    >
      {data.map((task) => {
        return (
          <TaskItem navigation={props.navigation} data={task} key={task._id} />
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    height: "73%",
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
