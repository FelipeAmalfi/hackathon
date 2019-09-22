import React, {useState, useEffect} from 'react';
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
  Text,
} from 'native-base';
import {loginRequest} from '../../store/actions/LoginAction';
import {useDispatch, useSelector} from 'react-redux';

const Login = props => {
  const [userName, setUser] = useState('felip.amalf@gmail.com');
  const [password, setPass] = useState('1234');
  const login = useSelector(state => state.login);
  const {canLogin} = login;
  const {navigation} = props;
  const dispatch = useDispatch();

  useEffect(() => {
    if (canLogin) {
      navigation.navigate('Profile');
    }
  }, [login]);

  return (
    <Container
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 120,
      }}>
      <Content>
        <Label
          style={{
            color: '#046bcc',
            marginTop: 24,
            fontSize: 24,
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
          Mentee
        </Label>
        <Form>
          <Item floatingLabel>
            <Label>Username</Label>
            <Input onChangeText={text => setUser(text)} />
          </Item>
          <Item floatingLabel last>
            <Label>Password</Label>
            <Input onChangeText={text => setPass(text)} />
          </Item>
        </Form>
        <Button
          primary
          color={'#046bcc'}
          style={{
            display: 'flex',
            margin: 24,
            justifyContent: 'center',
            width: 300,
          }}
          onPress={() => dispatch(loginRequest(userName, password))}>
          <Text>Login</Text>
        </Button>
      </Content>
    </Container>
  );
};

Login.navigationOptions = {
  header: null,
  headerLeft: null,
};

export default Login;
