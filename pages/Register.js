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
} from 'react-native';

export default class Register extends Component<{}> {

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
      />
      <TextInput
        style={styles.input}
        placeholder="Email Address"
        placeholderTextColor="#fff"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#fff"
        secureTextEntry
      />

      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        placeholderTextColor="#fff"
        secureTextEntry
      />

      <TouchableOpacity style={styles.userBtn}>
        <Text style={styles.btnTxt}>Signup</Text>
      </TouchableOpacity>
      
   </View>
    )
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
