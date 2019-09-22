import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  FlatList,
  ToastAndroid,
} from 'react-native';
import {useSelector} from 'react-redux';
import {StyleSheet} from 'react-native';
import axios from 'axios';
import moment from 'moment';

const WaitList = props => {
  const {navigation} = props;
  const login = useSelector(state => state.login);
  const {userInfo} = login;
  const {area} = userInfo;
  const [areaQueue, setAreaQueue] = useState([]);
  const [queueCount, setQueueCount] = useState(0);
  const photoCover = {
    uri: 'https://ak8.picdn.net/shutterstock/videos/31218658/thumb/1.jpg',
  };

  const getAreas = useCallback(() => {
    axios
      .get(`https://thequeuer.herokuapp.com/queues/${area.areaId}`)
      .then(response => {
        console.log(response);
        if (response.status === 200) {
          setAreaQueue(response.data.queue);
          setQueueCount(response.data.count);
        }
      });
  }, [login]);

  const removeFromQueue = useCallback(
    queueId => {
      axios
        .delete(`https://thequeuer.herokuapp.com/queues/${queueId}`)
        .then(response => {
          console.log(response);
          if (response.status === 200) {
            ToastAndroid.show(
              'The team is waiting for you!',
              ToastAndroid.SHORT,
            );
            navigation.goBack();
          }
        });
    },
    [login, areaQueue],
  );

  useEffect(() => {
    getAreas();
  }, [login]);

  const renderItem = item => {
    return (
      <View style={styles.listContainer}>
        <TouchableOpacity onPress={() => removeFromQueue(item.queueId)}>
          <Text style={styles.title}>{item.team.name}</Text>
          <Text style={styles.description}>
            Request time: {moment(item.reqAt).fromNow()}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ImageBackground
      source={photoCover}
      resizeMode="cover"
      style={styles.container}>
      <View style={{margin: 24}}>
        <Text style={styles.name}>
          There are {queueCount} teams waiting for help{' '}
        </Text>
      </View>
      {areaQueue && (
        <FlatList
          data={areaQueue}
          renderItem={({item}) => <View>{renderItem(item)}</View>}
        />
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  listContainer: {
    marginTop: 16,
    width: 300,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#fff',
    alignItems: 'center',
    padding: 12,
    backgroundColor: 'rgba(240,242,245,0.6)',
  },
  title: {
    marginTop: 8,
    fontSize: 18,
    alignItems: 'center',
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  description: {
    marginTop: 8,
    fontSize: 16,
    color: '#fff',
  },
  name: {
    marginTop: 16,
    color: '#fff',
    alignItems: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  areaTitle: {
    marginTop: 16,
    color: '#fff',
    alignItems: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

WaitList.navigationOptions = {
  header: null,
  headerLeft: null,
};

export default WaitList;
