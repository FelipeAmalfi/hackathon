import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import {StyleSheet} from 'react-native';

const Profile = props => {
  const photoLink = {
    uri:
      'https://scontent.fcgh8-1.fna.fbcdn.net/v/t1.0-9/16640952_1104706909638558_7931196132545005684_n.jpg?_nc_cat=108&_nc_oc=AQm_WOrIk8MBJpcieicGQow0J_y7qGa9g0s9wCwQrYmrwo25m4FhkmJMYdVSTu5b439fMcQd2u98TY-QJKOjw9aT&_nc_ht=scontent.fcgh8-1.fna&oh=2a9a28e5b8aefe54b5c7470d4b0fb061&oe=5DFCB2E3',
  };

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
      blurRadius={2}
      resizeMode="cover"
      style={styles.container}>
      <Image source={photoLink} style={styles.imageContainer} />
      <Text style={styles.name}>Felipe Amalfi Lima</Text>
      <Text style={styles.email}>Call do Baron</Text>
      <View backgroundColor={'rgba(240,242,245,0.6)'} style={styles.infoView}>
        <Text style={styles.profession}>Mobile Engineer at BWG</Text>
        <Text style={styles.email}>felip.amalf@gmail.com</Text>
        <View style={styles.socialNetworkContainer}>
          <Image source={facebookIcon} style={styles.snIcon} />
          <Image source={twitterIcon} style={styles.snIcon} />
          <Image source={linkedinIcon} style={styles.snIcon} />
          <Image source={instagramIcon} style={styles.snIcon} />
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Ver membros do time</Text>
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

export default Profile;
