import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import Tasks from "../screens/Tasks";
import Login from "../screens/Login";
import Profile from "../screens/Profile";
import TaskDetail from "../screens/TaskDetail";
import Colors from "../constants/Colors";
import Conversation from "../components/Conversation";

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : "",
  },

  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
};

const AuthNavigator = createStackNavigator(
  {
    Auth: Login,
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false,
    },
  }
);

const TasksNavigator = createStackNavigator(
  {
    Task: Tasks,
    ConversationScreen: Conversation,
    TaskDetail: TaskDetail,
    Profile: Profile,
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false,
    },
  }
);

const MainNavigator = createSwitchNavigator({
  Auth: AuthNavigator,
  Task: TasksNavigator,
});

export default createAppContainer(MainNavigator);
