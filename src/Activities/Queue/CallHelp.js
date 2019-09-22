import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {useSelector} from 'react-redux';
import {StyleSheet} from 'react-native';
import axios from 'axios';

const CallHelp = props => {
  const {navigation} = props;
  const login = useSelector(state => state.login);
  const {userInfo} = login;
  const {team} = userInfo;
  const [areas, setAreas] = useState([]);
  const [teamPosition, setTeamPosition] = useState(0);
  const [inQueue, setInQueue] = useState(team.queued);
  const photoCover = {
    uri: 'https://ak8.picdn.net/shutterstock/videos/31218658/thumb/1.jpg',
  };

  const getAreas = useCallback(() => {
    axios.get('https://thequeuer.herokuapp.com/areas').then(response => {
      if (response.status === 200) {
        setAreas(response.data);
      }
    });
  }, [login]);

  const getPosition = useCallback(() => {
    axios
      .get('https://thequeuer.herokuapp.com/queues/position/1')
      .then(response => {
        console.log(response);
        if (response.status === 200) {
          setTeamPosition(response.data);
          if (response.data === 0) {
            setInQueue(false);
            getAreas();
          } else {
            setInQueue(true);
          }
        }
      });
  }, [login, inQueue]);

  const enterQueue = useCallback(
    areaId => {
      axios
        .post('https://thequeuer.herokuapp.com/queues', {
          areaId,
          teamId: 1,
        })
        .then(response => {
          console.log(response);
          if (response.status === 200) {
            setInQueue(true);
            setTeamPosition(response.data.position);
          }
        });
    },
    [login, areas, inQueue],
  );

  useEffect(() => {
    getPosition();
  }, [login]);

  const renderItem = item => {
    return (
      <View style={styles.listContainer}>
        <TouchableOpacity onPress={() => enterQueue(item.areaId)}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <Text style={styles.description}>Teams waiting: {item.onQueue}</Text>
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
          {inQueue
            ? `You're on ${teamPosition}th position of the waiting list`
            : 'Your team is not on the queue!'}
        </Text>
      </View>
      {!inQueue && areas && (
        <Text style={styles.areaTitle}>Select the area you need help </Text>
      )}
      {!inQueue && areas && (
        <FlatList
          data={areas}
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
    fontWeight: 'bold',
    color: '#fff',
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

CallHelp.navigationOptions = {
  header: null,
  headerLeft: null,
};

export default CallHelp;
