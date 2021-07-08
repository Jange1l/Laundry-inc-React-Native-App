import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import TasksNavigator from "./TasksNavigator";
import AsyncStorage from '@react-native-async-storage/async-storage';

const NavigationContainer = props => {
  const navRef = useRef();
  const isAuth = true;
// Check in local storage is user is logged in
  useEffect(() => {
    if (isAuth) {
      navRef.current.dispatch(
        NavigationActions.navigate({ routeName: 'Auth' })
      );
    }
  }, [isAuth]);

  return <TasksNavigator ref={navRef} />;
};

export default NavigationContainer;
