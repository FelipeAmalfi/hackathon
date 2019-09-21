import React from 'react';
import useNavigation, {RouteType} from '../Hooks/useNavigation';

const MainContainer = props => {
  const TabContainer = useNavigation(RouteType.MainFragments);

  return <TabContainer />;
};

MainContainer.navigationOptions = {
  header: null,
  headerLeft: null,
};

export default MainContainer;
