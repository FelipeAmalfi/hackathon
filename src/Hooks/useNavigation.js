import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {fromBottom, fadeIn, fromLeft} from 'react-navigation-transitions';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';

import Splash from '../Activities/Splash/Splash';
import MainContainer from '../Activities/Main/Main';

export const RouteType = {
  MainNavigation: 1,
  MainFragments: 2,
};

function useNavigation(type) {
  const getAppContainer = () => {
    const AppStack = createStackNavigator(
      {
        Main: {
          screen: MainContainer,
        },
      },
      {
        initialRouteName: 'Main',
        transitionConfig: nav => handleCustomTransition(nav),
      },
    );

    const scene = {
      Splash: {screen: Splash},
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
        return fromLeft(750);
      }
    };

    return createAppContainer(AppNavigator);
  };

  const getMainFragments = () => {
    return createMaterialBottomTabNavigator(
      {
        Album: {screen: Album},
        Library: {screen: Library},
        History: {screen: History},
        Cart: {screen: Cart},
      },
      {
        initialRouteName: 'Album',
        activeColor: '#f0edf6',
        inactiveColor: '#3e2465',
        barStyle: {backgroundColor: '#694fad'},
      },
    );
  };

  switch (type) {
    case RouteType.MainNavigation:
      return getAppContainer();
    case RouteType.MainFragments:
      return getMainFragments();
    default:
      return AppContainer;
  }
}

export default useNavigation;
