import React from 'react';
import { View, Text } from 'react-native';
import { Container, Header, Content, Footer, FooterTab, Button, Icon} from 'native-base';
import { Font , AppLoading} from "expo";
import FooterTabsIconText from "./FooterTabsIconText.js"





export default class HomeScreen extends React.Component {

state={ isReady: false }

async componentWillMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({isReady:true})
  }

  render() {
    if (!this.state.isReady) { return <Expo.AppLoading />; }
    
    return (
      <Container style={{marginTop: 20}}>
        
        <Content>
        <Text>Apps</Text>

        </Content>
        <FooterTabsIconText />
      </Container>
      );
  }
}


