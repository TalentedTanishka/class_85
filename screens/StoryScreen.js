import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  Image,
  Dimensions,
  TouchableOpacity
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RFValue } from "react-native-responsive-fontsize";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import * as Speech from "expo-speech";
let customFonts = {
  "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf")
};

export default class StoryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      speakercolor: "gray",
       speakericon: "volume-high-outline"
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }

  InitiateSound = async(title , author , story , moral)=>{
const currentColor = this.state.speakercolor

this.setState({
  speakercolor : currentColor === "gray" ? "yellow" : "gray"
})

if(currentColor === "gray")
{
Speech.speak("Title,");
Speech.speak(title);
Speech.speak("By ,");
Speech.speak( author);
Speech.speak(story);
Speech.speak("The moral of the story is " );
Speech.speak(moral);
}
else{
  Speech.stop()
}
  }

  render() {
      if(!this.props.route.params)
      {
          this.props.navigation.navigate("Home")
      }
     else if (!this.state.fontsLoaded) {
      return <AppLoading />;
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.cardContainer}>
            <Image
              source={require("../assets/story_image_1.png")}
              style={styles.storyImage}
            ></Image>

            <View style={styles.titleContainer}>
              <Text style={styles.storyTitleText}>
                {this.props.route.params.story.titles}
              </Text>
              <Text style={styles.storyAuthorText}>
                {this.props.route.params.story.author}
              </Text>
              <Text style={styles.descriptionText}>
                Created On.. {this.props.route.params.story.created_on}
              </Text>
            </View>
           
            <View style={styles.iconContainer}>
                  <TouchableOpacity onPress={()=>{
 this.InitiateSound(this.props.route.params.story.title , this.props.route.params.story.author , this.props.route.params.story.story , this.props.route.params.story.moral)
                    
                  }}>
                      <Ionicons
                      name = {this.state.speakericon}
                      size = {RFValue(30)}
                      color={this.state.speakercolor}
                      style={{margin : RFValue(15) }}
                      >

                      </Ionicons>
                  </TouchableOpacity>

                  </View>
                  <View style={styles.storyContainer}>
                  <Text style={styles.storyTextContainer}>
                    {this.props.route.params.story.story}
                  </Text>
                  <Text style={styles.moralTextContainer}>
                    {this.props.route.params.story.moral}
                  </Text>
                  </View>

            <View style={styles.actionContainer}>
           
              <View style={styles.likeButton}>
                <Ionicons name={"heart"} size={RFValue(30)} color={"white"} />
                <Text style={styles.likeText}>12k</Text>
              </View>
            </View>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  cardContainer: {
    margin: RFValue(13),
    backgroundColor: "#2f345d",
    borderRadius: RFValue(20)
  },
  storyImage: {
    resizeMode: "contain",
    width: "95%",
    alignSelf: "center",
    height: RFValue(250)
  },
  titleContainer: {
    paddingLeft: RFValue(20),
    justifyContent: "center"
  },
  storyTitleText: {
    fontSize: RFValue(25),
    fontFamily: "Bubblegum-Sans",
    color: "white"
  },
  storyAuthorText: {
    fontSize: RFValue(18),
    fontFamily: "Bubblegum-Sans",
    color: "white"
  },
  descriptionText: {
    fontFamily: "Bubblegum-Sans",
    fontSize: 13,
    color: "white",
    paddingTop: RFValue(10)
  },
  actionContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: RFValue(10)
  },
  likeButton: {
    width: RFValue(160),
    height: RFValue(40),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#eb3948",
    borderRadius: RFValue(30)
  },
  likeText: {
    color: "white",
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(25),
    marginLeft: RFValue(5)
  }
});