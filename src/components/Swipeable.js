import React, {useEffect, useState, useCallback} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  Image,
} from 'react-native';

import {StyleSheet} from 'react-native';
import SwipeablePanel from 'rn-swipeable-panel';
import axios from 'axios';

const Swipeable = props => {
  const {navigation} = props;

  // STATE
  const [swipeablePanelActive, setSwipeable] = useState(false);
  const [membersList, setMembersList] = useState([]);
  const [loading, setLoading] = useState(false);

  // REQUEST
  const getMembers = useCallback(() => {
    setLoading(true);
    axios
      .get('https://thequeuer.herokuapp.com/teams/members/1')
      .then(response => {
        if (response.status === 200) {
          setMembersList(response.data.members);
        }
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    openPanel();
    getMembers();
  }, []);

  const openPanel = () => {
    setSwipeable(true);
  };

  const closePanel = () => {
    setSwipeable(false);
    navigation.goBack();
  };

  const renderItem = item => {
    return (
      <View style={styles.memberItem}>
        <Image source={{uri: item.photo}} style={styles.imageContainer} />
        <View style={{alignItems: 'center'}}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.positionUser}>{item.position}</Text>
        </View>
      </View>
    );
  };

  const renderUsers = () => {
    if (membersList.length > 0) {
      return (
        <View style={{flex: 1}}>
          <FlatList
            data={membersList}
            renderItem={({item}) => <View>{renderItem(item)}</View>}
          />
        </View>
      );
    } else {
      return (
        <View>
          <Text>Ocorreu um problema, tente novamente.</Text>
        </View>
      );
    }
  };

  return (
    <SafeAreaView>
      <SwipeablePanel
        style={styles.swip}
        fullWidth
        isActive={swipeablePanelActive}
        onClose={() => closePanel()}
        noBackgroundOpacity={true}>
        {!loading ? (
          <View>{renderUsers()}</View>
        ) : (
          <ActivityIndicator size="large" color="#fdbf17" />
        )}
      </SwipeablePanel>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  imageContainer: {
    marginLeft: 8,
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  memberItem: {
    marginLeft: 8,
    width: '100%',
    height: 60,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  name: {
    marginLeft: 8,
    color: '#000000',
    alignItems: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  positionUser: {
    marginLeft: 20,
    color: '#000000',
    alignItems: 'center',
    fontSize: 16,
  },
});

Swipeable.navigationOptions = {
  header: null,
  headerLeft: null,
};

export default Swipeable;
