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
  ActivityIndicator,
  FlatList,
  Linking
} from 'react-native';

export default class App extends Component {
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
    return (
     
      this.state.isloading
      ?
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#330066" animating />
      </View>
      :
      <ScrollView> 
      <View style={styles.sectionContainer}>
        
        <Text style={styles.heading}>React Native App</Text> 

        <SafeAreaView style={styles.container}>
            <FlatList
              data={this.state.dataSource}
              renderItem={this.renderItem} 
              keyExtractor={(item, index) => index}
            /> 
          </SafeAreaView>
      </View>
      </ScrollView>
   
    );
  }
}

const styles = StyleSheet.create({
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
    backgroundColor: '#cccccc', 
  }
});
