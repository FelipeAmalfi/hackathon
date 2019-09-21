import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Text,
  Icon,
  Right,
} from 'native-base';
const NeedHelp = () => {
  const [inQueue, setInQueue] = useState(false);

  return (
    <Container>
      <Header>
        <Text>Aonde você precisa de ajuda?</Text>
      </Header>
      <Content>
        <Card>
          <CardItem onPress={() => alert('CLICOU NESSA PORRA')}>
            <Icon active name="logo-googleplus" />
            <Text>Google Plus</Text>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </CardItem>
        </Card>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
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

export default NeedHelp;
