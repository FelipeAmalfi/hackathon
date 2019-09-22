import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {fromBottom, fadeIn, fromLeft} from 'react-navigation-transitions';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import {View} from 'react-native';

import Splash from '../Activities/Splash/Splash';

import Profile from '../Activities/Profile/Profile';
import Login from '../Activities/Login/Login';
import NeedHelp from '../Activities/Queue/CallHelp';
import WaitList from '../Activities/Queue/WaitList';
import Swipeable from '../components/Swipeable';

export const RouteType = {
  MainNavigation: 1,
  MainFragments: 2,
};

const getTabs = () => {
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
      NeedHelp: {
        screen: NeedHelp,
        navigationOptions: {
          tabBarLabel: 'Call Mentor',
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
      inactiveColor: '#031e80',
      barStyle: {backgroundColor: '#046bcc'},
    },
  );
  return createAppContainer(TabNavigator);
};

const getAppContainer = () => {
  const AppStack = createStackNavigator(
    {
      Help: {
        screen: NeedHelp,
      },
      Profile: {
        screen: Profile,
      },
      WaitList: {
        screen: WaitList,
      },
      ListSwip: {
        screen: Swipeable,
      },
    },
    {
      initialRouteName: 'Profile',
      transparentCard: true,
      headerMode: 'none',
      mode: 'modal',
      transitionConfig: () => ({
        transitionSpec: {
          duration: 0,
        },
      }),
      cardStyle: {
        opacity: 1.0,
      },
      transitionConfig: nav => handleCustomTransition(nav),
    },
  );

  const AuthStack = createStackNavigator(
    {
      Login: {
        screen: Login,
      },
    },
    {
      header: 'none',
      initialRouteName: 'Login',
    },
  );

  const scene = {
    Splash: {screen: Splash},
    Login: AuthStack,
    App: AppStack,
  };

  let AppNavigator = createSwitchNavigator(scene, {
    initialRouteName: 'Splash',

    transitionConfig: nav => handleCustomTransition(nav),
  });

  const handleCustomTransition = ({scenes}) => {
    const prevScene = scenes[scenes.length - 2];
    const nextScene = scenes[scenes.length - 1];
    // Custom transitions go there
    if (
      prevScene &&
      prevScene.route.routeName === 'Splash' &&
      nextScene.route.routeName === 'Login'
    ) {
      return fadeIn(750);
    } else if (
      prevScene &&
      prevScene.route.routeName === 'Splash' &&
      nextScene.route.routeName === 'App'
    ) {
      return fromBottom(750);
    } else {
      return fromBottom(500);
    }
  };

  return createAppContainer(AppNavigator);
};

function useNavigation(type) {
  switch (type) {
    case RouteType.MainNavigation:
      return getAppContainer();
    case RouteType.MainFragments:
      return getTabs();
    default:
      return AppContainer;
  }
}

export default useNavigation;
