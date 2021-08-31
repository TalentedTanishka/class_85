import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  Platform,
  StatusBar,
  Image,
  SafeAreaView
} from "react-native";
import * as Google from 'expo-google-app-auth';
import * as firebase from "firebase";
import {RFValue} from 'react-native-responsive-fontsize';
let customFonts = {
    "BubbleGum-Sans":require("../assets/fonts/BubblegumSans-Regular.ttf")//assets\fonts\BubblegumSans-Regular.ttf
}

import AppLoading  from "expo-app-loading";
import * as Font  from 'expo-font';

export default class LoginScreen extends Component {

    constructor(props)
    {
        super(props);

        this.state={
            fontsLoaded : false
        }
    }
async _loadFontsAsync(){
    await Font.loadAsync(customFonts);
    this.setState({
        fontsLoaded:true
    })
}

componentDidMount()
{
    this._loadFontsAsync()
}
   isUserEqual(googleUser, firebaseUser) {
        if (firebaseUser) {
          var providerData = firebaseUser.providerData;
          for (var i = 0; i < providerData.length; i++) {
            if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
                providerData[i].uid === googleUser.getBasicProfile().getId()) {
              // We don't need to reauth the Firebase connection.
              return true;
            }
          }
        }
        return false;
      }

    onSignIn = async(googleuser)=>{
        var cheak = firebase.auth.onAuthStateChanged(firebaseuser=>{
            cheak()
            if(!this.isUserEqual(googleuser,firebaseuser) )
            {
                var credential = firebase.auth.GoogleAuthProvider.credential(
                    googleuser.idToken , googleuser.accessToken
                    )
                    firebase.auth.signInWithCredential(credential).
                    then(function(result){
                        if(result.additionalUserInfo.isNewUser)
                        {
                            firebase.database().ref("/users/"+result.user.uid).
                            set({
                                gmail:result.user.email,
                                profile_picture : result.additionalUserInfo.profile.picture,
                                locale : result.additionalUserInfo.profile.locale,
                                first_name : result.additionalUserInfo.profile.given_name,
                                last_name:result.additionalUserInfo.profile.family_name,
                                current_theme : "dark"                       
                                 }).
                                 then(function(snapshot){

                                 })

                        }
                    })

                    .catch(error=>{
                        var errorcode = error.code 
                        var error = error.message
                        var email = error.email
                        var credential = error.credential
                    })
                    
            }
            else 
            {
                console.log("User is already signed in firebase" )
            }
        })
    }


    signInWithGoogleAsync=async()=>{
     
        try {
            const result = await Google.logInAsync({
                behavior : "web" ,
                androidClientId : "1026970014141-hl47pv9us1p0ls15bcotfuis4go3eifl.apps.googleusercontent.com" ,
                iosClientId : "1026970014141-63vp66atpertsm65kppde8h8u6923mrv.apps.googleusercontent.com",
                scopes : ["profile", "email"]
            })
            if(result.type == "success")
            {
                this.onSignIn(result)
                return result.accessToken
            }
            else 
            {
                return {cancelled : true}
            }
            

        }
        catch (e)
        {
            console.log(e.message)
            return {error:true} 
        }
    }

    render(){
        if(!this.state.fontsLoaded)
        {
            return <AppLoading/>
            
        }
        else 
        {
         return(
             
            <View style={styles.container}>
                <SafeAreaView style={styles.AndroidSafeArea}/>
                <View style={styles.AppTitle}>
                    <Image
                    source = {require("../assets/logo.png")}
                    style={styles.Appicon} >
                    </Image>
                    <Text style={styles.AppTitleText}>
                        {'StoryTelling\nApp'}
                    </Text>
                </View>
                <View style={styles.ButtonContainer}>
                <TouchableOpacity style={styles.Button}
                onPress={()=>      this.signInWithGoogleAsync() }> 
                <Image 
                source ={ require("../assets/google_icon.png")}
                style={styles.googleicon}>
                </Image>
                <Text style={styles.googleText}>
                    Sign in With Google
                </Text>
                </TouchableOpacity>
                <View style={styles.cloudContainer}>
                    <Image
                    source={require("../assets/cloud.png")}
                    style={styles.cloudImage}>
                    </Image>
                </View>
                </View>
                
                    
            </View>
         );
    }
}
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#15193c"
    },
    droidSafeArea: {
      marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
    },
    appTitle: {
      flex: 0.4,
      justifyContent: "center",
      alignItems: "center"
    },
    appIcon: {
      width: RFValue(130),
      height: RFValue(130),
      resizeMode: "contain"
    },
    appTitleText: {
      color: "white",
      textAlign: "center",
      fontSize: RFValue(40),
      fontFamily: "Bubblegum-Sans"
    },
    buttonContainer: {
      flex: 0.3,
      justifyContent: "center",
      alignItems: "center"
    },
    button: {
      width: RFValue(250),
      height: RFValue(50),
      flexDirection: "row",
      justifyContent: "space-evenly",
      alignItems: "center",
      borderRadius: RFValue(30),
      backgroundColor: "white"
    },
    googleIcon: {
      width: RFValue(30),
      height: RFValue(30),
      resizeMode: "contain"
    },
    googleText: {
      color: "black",
      fontSize: RFValue(20),
      fontFamily: "Bubblegum-Sans"
    },
    cloudContainer: {
      flex: 0.3
    },
    cloudImage: {
      position: "absolute",
      width: "100%",
      resizeMode: "contain",
      bottom: RFValue(-5)
    }
  });