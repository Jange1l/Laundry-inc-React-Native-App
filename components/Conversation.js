import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { SafeAreaView } from "react-navigation";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import { View } from "react-native";
import { Button } from "react-native-paper";

export default function Conversation(props) {
  const [messages, setMessages] = useState([]);
  const taskName = props.navigation.getParam("taskName");
  const taskDescription = props.navigation.getParam("taskDescription");
  const taskId = props.navigation.getParam("taskId");
  const conversationId = props.navigation.getParam("conversationId");

  const sendMessage = async (msg) => {
    const length = messages.length;
    console.log("Message sent ");
    console.log(msg);
    console.log(conversationId);
    try {
      const res = await axios.post(
        `http://localhost:8080/tasks/taskConversation/:${conversationId}`,
        {
          text: msg[0].text,
          _id: msg[0]._id,
          user: { _id: 2, name: "Staff", avatar: "" },
          createdAt: msg[0].createdAt,
        }
      );
      const res2 = await axios.get(
        `http://localhost:8080/tasks/taskConversation/:${conversationId}`
      );

      setMessages(res2.data.conversation.messages);
    } catch (err) {
      console.log(err);
    }
  };

  const onSend = useCallback((msg = []) => {
    sendMessage(msg);
    //setMessages((previousMessages) => GiftedChat.append(previousMessages, msg));
  }, []);

  useEffect(() => {
    console.log(taskName);
    console.log(taskId);
    console.log(conversationId);

    const fetchConversation = async () => {
      const res = await axios.get(
        `http://localhost:8080/tasks/taskConversation/:${conversationId}`
      );

      setMessages(res.data.conversation.messages);
    };
    fetchConversation();
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
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
      <GiftedChat
        messages={messages}
        onSend={(msg) => onSend(msg)}
        user={{ _id: 2, name: "Staff" }}
        inverted={false}
        scrollToBottom
      />
    </SafeAreaView>
  );
}
