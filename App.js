import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Alert,
  Text,
  StatusBar,
  Image,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  ImageBackground,
  ActivityIndicator,
  FlatList,
  Linking
} from 'react-native';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack';

import Login from './pages/Login';
import Register from './pages/Register';

class HomeScreen extends React.Component {
static navigationOptions = {
    header: null
  };
render() {
    const {navigate} = this.props.navigation;
    return (
    <ImageBackground source={require('./images/login_background.png')} style={styles.MainContainer}>
      <View style={styles.body}>
         <Image
          style={{width:300, height: 80,marginVertical:50,}}
          source={require('./images/logo.png')}
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
      
      <TouchableOpacity style={styles.userBtn} activeOpacity={0.9}
        onPress={() => {
            alert('Success')
        }
        }>
        <Text style={styles.btnTxt}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.account}>Don't have an account?>
        <Text style={styles.bold} onPress={() => navigate('Profile')}> Create Account</Text>
      </Text>
      
      <Text style={styles.signUp}>Signup with</Text>
  </View>
   </ImageBackground> 
    );
  }
}

class RegisterScreen extends React.Component {

static navigationOptions = ({navigation}) => { 
  return { headerTitle: <Text style={{color: 'white', fontSize: 18}}>Back to Login Page</Text>, 
  headerTransparent: true, 
  headerStyle: { borderBottomWidth: 0, 
  } } };
render() {
    const {navigate} = this.props.navigation;
    return (
      <ImageBackground source={require('./images/login_background.png')} style={styles.MainContainer}>
      
      <View style={styles.body}>
    <Text style={{color: 'white', fontSize: 28, fontWeight: 'bold',textAlign: "left", width:'80%'}}>Sign Up</Text>
       <Image
        style={{width:150, height: 150,}}
        source={require('./images/user.png')}
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

      <TouchableOpacity style={styles.userBtn} onPress={() => navigate('Campaign')}>
        <Text style={styles.btnTxt}>Signup</Text>
      </TouchableOpacity>
      
   </View>
    </ImageBackground> 
    );
  }
}

class CampaignScreen extends React.Component {

  constructor() {
    super()
    this.state = {
      dataSource: [],
      isloading:true
    }
  }

  renderItem = ({ item }) => {
    return(
      <View style={styles.campaignData}>
        <Text style={styles.heading}>{item.campaign_title}</Text>
        <Text>{item.campaign_date}</Text>
        <Text>Campaign Goal: {item.campaign_goal}</Text>
        <Text>Location: {item.location}</Text>
        <Image source={{ uri: item.campaign_image}} style={{width: 280, height: 90, marginBottom:20, marginTop:20}} /> 
        <Text>{item.campaign_content}</Text>
    </View>
    )
  }

  componentDidMount() {
    const url = 'https://staging-gridshub.site/sadaqat-demo/api/custom-api/campaign-native'
    fetch(url)
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        dataSource : responseJson,
        isloading: false
      })
    })
    .catch((error) => {
      console.log(error)
    })
  }
render() {
    const {navigate} = this.props.navigation;
    return (
      this.state.isloading
      ?
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#330066" animating />
      </View>
      :
     
      <View style={styles.sectionContainer}>
        
        <Text style={styles.heading}>Campaign List</Text> 

        <SafeAreaView style={styles.container}>
            <FlatList
              data={this.state.dataSource}
              renderItem={this.renderItem} 
              keyExtractor={(item, index) => index}
            /> 
          </SafeAreaView>
      </View>
 
    );
  }
}
const MainNavigator = createStackNavigator({
  Home: {screen: HomeScreen},
  Profile: {screen: RegisterScreen},
  Campaign: {screen: CampaignScreen},
});

const App = createAppContainer(MainNavigator);
export default App;

const styles = StyleSheet.create({
 MainContainer: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
   width: null,
   height: null,
 },
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
  },
  bold: {
    fontWeight: 'bold'
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 30,
    textAlign:'center',
    marginBottom: 20,
  },
  campaignData: {
    marginBottom: 20, 
    padding:10,
    backgroundColor: '#21a66c', 
  },
  transparentHeader: {
    position: 'absolute',
    backgroundColor: 'transparent',
    zIndex: 100,
    top: 0,
    left: 0,
    right: 0
  },
});

