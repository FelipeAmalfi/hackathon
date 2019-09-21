import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import {createBottomTabNavigator, createAppContainer} from 'react-navigation';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import Profile from '../Fragments/Profile/Profile';
import Queue from '../Fragments/Queue/Queue';

const MainContainer = props => {
  const TabNavigator = createMaterialBottomTabNavigator(
    {
      Profile: {
        screen: Profile,
        navigationOptions: {
          tabBarLabel: 'Profile',
          tabBarIcon: ({tintColor}) => (
            <View>
              <Icon
                style={[{color: tintColor}]}
                size={25}
                name={'ios-person'}
              />
            </View>
          ),
        },
      },
      Queue: {
        screen: Queue,
        navigationOptions: {
          tabBarLabel: 'Queue',
          tabBarIcon: ({tintColor}) => (
            <View>
              <Icon style={[{color: tintColor}]} size={25} name={'ios-list'} />
            </View>
          ),
          activeColor: '#fff',
          inactiveColor: '#232375',
          barStyle: {backgroundColor: '#3232a8'},
        },
      },
    },
    {
      header: 'none',
      initialRouteName: 'Profile',
      activeColor: '#fff',
      inactiveColor: '#15348a',
      barStyle: {backgroundColor: '#046bcc'},
    },
  );

  const ContainerWithTabs = createAppContainer(TabNavigator);

  return <ContainerWithTabs />;
};

MainContainer.navigationOptions = {
  header: null,
  headerLeft: null,
  gesturesEnabled: false,
};

export default MainContainer;
