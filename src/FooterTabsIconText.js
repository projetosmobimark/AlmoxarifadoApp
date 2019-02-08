import React, { Component } from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text } from 'native-base';
import { Font , AppLoading} from "expo";


export default class FooterTabsIconText extends Component {

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
      
        <Footer>
          <FooterTab>
            <Button vertical >
              <Icon name="apps" />
              <Text>Lista</Text>
            </Button>
            <Button vertical onPress={this.props.navigation.navigate('Historico')}>
              <Icon name="camera" />
              <Text>Histórico</Text>
            </Button>
            
            
          </FooterTab>
        </Footer>
    );
  }
}