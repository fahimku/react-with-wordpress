import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  ImageBackground,
} from 'react-native';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
export default class Login extends Component<{}> {
  constructor() {
    super()
    this.state = {
    validating: false
  }
  }

  render() { 
  return (

   <View style={styles.body}>
         <Image
          style={{width:300, height: 80,marginVertical:50,}}
          source={require('../images/logo.png')}
        />
     
       <TextInput
        style={styles.input}
        placeholder="User Name"
        placeholderTextColor="#fff"
        onChangeText={(text) => this.setState({email:text})}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#fff"
        secureTextEntry onChangeText={(text) => this.setState({password:text})}
      />
      
      <Text style={styles.forgot}>Forgot Password?</Text>
      
      <TouchableOpacity style={styles.userBtn} block success onPress={() => {
              if( this.state.email && this.state.password ){
                this.validate();}
            }}>
        <Text style={styles.btnTxt}>Login</Text>
      </TouchableOpacity>
      
      <Text style={styles.account}>Don't have an account? 
        <Text onPress={() => navigate('Login')}> Create Account</Text>
      </Text>
      
      <Text style={styles.signUp}>Signup with</Text>
  </View>
    )
  }

  validate(){
    this.setState({ validating: true });

    let formData = new FormData();
    formData.append('type', 'login');
    formData.append('email', this.state.email);
    formData.append('password', this.state.password);

    return fetch('http://staging-gridshub.site/sadaqat-demo/authentication.php', {
      method: 'POST',
      body: formData
    })
      .then((response) => response.json())
      .then((responseJson) => {
        let data = responseJson.data;

        if (this.saveToStorage(data)){
          this.setState({
            validating: false
          });
          
          /* Redirect to accounts page */
          Actions.pageAccount();
        } else {
          console.log('Failed to store auth');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  async saveToStorage(userData){
    if (userData) {
      await AsyncStorage.setItem('user', JSON.stringify({
          isLoggedIn: true,
          authToken: userData.auth_token,
          id: userData.user_id,
          name: userData.user_login
        })
      );
      return true;
    }

    return false;
  }
}

const styles = StyleSheet.create({
 body: {
    width:'100%',
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  input: {
    width: "80%",
    borderBottomWidth:1,
    borderColor:'white',
    color:'white',
    marginBottom:10,
    fontSize: 16,
  },
  forgot: {
    width: "80%",
    textAlign: 'right',
    color: '#ffffff',
    fontWeight: 'bold',
  },
  userBtn: {
    backgroundColor: '#ffffff', 
    width: "60%",
    padding: 15,
    marginTop:15,
    marginBottom:15,
    borderRadius: 50,
  },
  btnTxt: {
     textAlign: 'center',
     fontSize: 20,
     color: '#22a86d',
     fontWeight: 'bold' 
  },
  account: {
    color: '#ffffff',
  },
  signUp: {
    marginTop:15,
  }
});
