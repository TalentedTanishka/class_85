import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
let customFonts = {
    "BubbleGum-Sans":require("../assets/fonts/BubbleGumSans-Regular.ttf")
}
export default class Profile extends React.Component{

    constructor(props)
    {
        super(props);

        this.state={
            fontsLoaded:false,
            isEnabled:false,
            light_theme : true,
            profile_image:"",
            name:""
        }    
    }
 
    /*
    toggleSwitch(){
        const previous_state = this.state.isEnabled;
        const theme = !this.state.isEnabled ? "dark" : "light" ;
        var updates = {};
        updates[
            "/users/"+firebase.auth().currentUser.uid+"/current_theme"
        ]=theme;
        firebase.database().ref().update(updates);
        this.setState({
            isEnabled:!previous_state,
            light_theme:previous_state
        })
    }
    async _loadFontsAsync(){
        await Font.LoadAsync(customFonts);
        this.setState({
            fontsLoaded:true
        })
    }
   
    componentDidMount()
    {
        this._loadFontsAsync()
    }
 
    async FetchUser()
    {
        let theme , name , image ; 

        await firebase.database().ref("/users"+firebase.auth().currentUser.uid)
    }
       */
    render()
     {
         return(
             <View style={{flex:1 , justifyContent:"center", alignItems:"center"}}>
                 <Text>
               Profile
                 </Text>
             </View>
         )
     }
 }