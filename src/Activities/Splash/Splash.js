import React, {useEffect} from 'react';
import {View, Text} from 'react-native';

const Splash = props => {
  const {navigation} = props;

  useEffect(() => {
    navigation.navigate('Login');
  }, [navigation]);

  return (
    <View>
      <Text>Essa é uma splash</Text>
    </View>
  );
};

export default Splash;
