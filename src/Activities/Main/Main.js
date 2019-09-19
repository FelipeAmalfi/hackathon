import React from 'react';
import useNavigation, {RouteType} from '../../Hooks/useNavigation';

const Main = () => {
  const Fragments = useNavigation(RouteType.MainFragments);

  return <Fragments />;
};

export default Main;
