import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import  {NavigationContainer} from '@react-navigation/native';
const Tab = createMaterialBottomTabNavigator();
import Feed from '../screens/FeedStory';
import CreateStory from '../screens/CreateStory';
import Ionicons from 'react-native-vector-icons/Ionicons'
import {RFValue} from 'react-native-responsive-fontsize'

const BottomTabNavigator = ()=>  {
  return (
   
      <Tab.Navigator labeled = {false} barStyle = {styles.bottomStyle} screenOptions = {({route})=>({
        tabBarIcon:({focused, color , size })=>{
          let iconName

          if(route.name === "Feed")
          {
            iconName = focused?'home':'home-outline'
          }
          else if(route.name === "CreateStory"){
            iconName = focused?'add-circle':'add-circle-outline'
          }
          return <Ionicons name = {iconName} size={RFValue(25)} color={color} style={styles.icons}/>

        }
      
        
      })}
   activeColor={"#EE8249"}
   inactiveColor={"gray"}
      >
        <Tab.Screen name="Feed" component={Feed}/>
        <Tab.Screen name="CreateStory" component={CreateStory}/>
      </Tab.Navigator>

  );
}

const styles = StyleSheet.create({

  bottomStyle:{
    backgroundColor:"#2F2853",
    height:"8%",
    borderTopLeftRadius:30,
    borderTopRightRadius:30,
    overflow:"hidden",
    position:"absolute"
  },

  icons:{
    width : RFValue(30),
    height : RFValue(30)
  }
})

export default BottomTabNavigator
