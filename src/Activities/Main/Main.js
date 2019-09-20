import React from 'react';
import Profile from '../../Fragments/Profile/Profile';
import Queue from '../../Fragments/Queue/Queue';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

const Main = props => {
  const {navigation} = props;
  const Tab = createMaterialBottomTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Queue" component={Queue} />
    </Tab.Navigator>
  );
};

export default Main;
