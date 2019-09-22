import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useSelector} from 'react-redux';
import {StyleSheet} from 'react-native';

const Profile = props => {
  const {navigation} = props;
  const login = useSelector(state => state.login);
  const {userInfo} = login;
  const isMember = userInfo.type === 'Member';

  const photoCover = {
    uri: 'https://ak8.picdn.net/shutterstock/videos/31218658/thumb/1.jpg',
  };

  const facebookIcon = require('../../images/fbLogo.png');
  const twitterIcon = require('../../images/twitterLogo.png');
  const linkedinIcon = require('../../images/linkedinLogo.png');
  const instagramIcon = require('../../images/instagramLogo.png');

  return (
    <ImageBackground
      source={photoCover}
      blurRadius={1}
      resizeMode="cover"
      style={styles.container}>
      <Image source={{uri: userInfo.photo}} style={styles.imageContainer} />
      <Text style={styles.name}>{userInfo.name}</Text>
      <Text style={styles.email}>
        {isMember ? userInfo.team.name : userInfo.area.name}
      </Text>
      {isMember && (
        <TouchableOpacity onPress={() => navigation.navigate('ListSwip')}>
          <Text style={styles.memberButton}>Ver membros</Text>
        </TouchableOpacity>
      )}
      <View backgroundColor={'rgba(240,242,245,0.6)'} style={styles.infoView}>
        <Text style={styles.profession}>{userInfo.position}</Text>
        <Text style={styles.email}>{userInfo.login}</Text>
        <View style={styles.socialNetworkContainer}>
          <Image source={facebookIcon} style={styles.snIcon} />
          <Image source={twitterIcon} style={styles.snIcon} />
          <Image source={linkedinIcon} style={styles.snIcon} />
          <Image source={instagramIcon} style={styles.snIcon} />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            isMember
              ? navigation.navigate('Help')
              : navigation.navigate('WaitList')
          }>
          <Text style={styles.buttonText}>
            {isMember ? 'I need a mentor' : 'Check Queue'}
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  infoView: {
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '50%',
  },
  imageContainer: {
    marginTop: 16,
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  name: {
    marginTop: 16,
    color: '#fff',
    alignItems: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
  email: {
    marginTop: 8,
    color: '#fff',
    alignItems: 'center',
    fontSize: 20,
  },
  memberButton: {
    marginTop: 8,
    color: '#3232a8',
    alignItems: 'center',
    fontSize: 16,
  },
  profession: {
    marginTop: 14,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    opacity: 1,
  },
  title: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  socialNetworkContainer: {
    marginTop: 16,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  snIcon: {
    width: 50,
    height: 50,
    marginRight: 8,
    opacity: 1,
  },
  button: {
    marginTop: 40,
    width: 200,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#046bcc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

Profile.navigationOptions = {
  header: null,
  headerLeft: null,
};

export default Profile;
