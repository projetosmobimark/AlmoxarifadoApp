import React from 'react';
import { View, Text,AsyncStorage } from 'react-native';
import { Container, Header, Content, Footer, FooterTab, Button, Icon} from 'native-base';
import { Font , AppLoading} from "expo";
import FooterTabsIconText from "./FooterTabsIconText.js"





export default class HomeScreen extends React.Component {


constructor(){
  super();

  this.state = {isReady: false , id_user: '', usuario: ''};
  
  
}

_setIdUsuario = async () => {
    const id_user = await AsyncStorage.getItem('id');
    this.setState({id_user:id_user});
    fetch('http://mobilaravel.herokuapp.com/api/usuarios/'+ this.state.id_user)
    .then(resposta => resposta.json())
    .then(json => this.setState({usuario: json}))
};  

componentDidMount(){
  this._setIdUsuario();
}

_signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };

async componentWillMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({isReady:true});
  }

  render() {
    if (!this.state.isReady) { return <Expo.AppLoading />; }
    
    return (
      <Container style={{marginTop: 20}}>
        
        <Content>
        
        <Text>{this.state.usuario.nome}</Text>
        <Text>{this.state.usuario.usuario}</Text>
        

        </Content>
        
      </Container>
      );
  }
}


