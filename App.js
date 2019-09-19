import React from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import useNavigation, {RouteType} from './src/Hooks/useNavigation';

import index from './src/store/reducers/index';

const App = () => {
  const Navigation = useNavigation(RouteType.MainNavigation);

  const middlewares = [];
  middlewares.push(thunk);
  if (__DEV__) {
    middlewares.push(logger);
  }

  const store = createStore(index, applyMiddleware(...middlewares));

  console.disableYellowBox = true;
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
};

export default App;
