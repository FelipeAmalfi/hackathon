import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {fromBottom, fadeIn, fromLeft} from 'react-navigation-transitions';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

import Splash from '../Activities/Splash/Splash';

import Profile from '../Fragments/Profile/Profile';
import Queue from '../Fragments/Queue/Queue';
import MainContainer from '../Activities/MainContainer';

export const RouteType = {
  MainNavigation: 1,
  MainFragments: 2,
};

function useNavigation(type) {
  const getAppContainer = () => {
    const ResultsNavigator = createMaterialBottomTabNavigator(
      {
        Fila: {
          screen: Queue,
          navigationOptions: {
            tabBarIcon: ({tintColor, focused}) => (
              <Icon name="list" size={20} color={tintColor} />
            ),
          },
        },
        Perfil: {
          screen: Profile,
          navigationOptions: {
            tabBarIcon: ({tintColor, focused}) => (
              <Icon name="user" size={20} color={tintColor} />
            ),
          },
        },
      },
      {
        tabBarPosition: 'bottom',
        header: null,
        barStyle: {
          backgroundColor: '#347deb',
        },
      },
    );

    const AppStack = createStackNavigator(
      {
        Main: {
          screen: MainContainer,
        },
        Results: {
          screen: ResultsNavigator,
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
