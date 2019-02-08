import React from 'react';
import { View,ListView, ScrollView ,RefreshControl, FlatList  } from 'react-native';
import { Container, Content, Button, Icon,Text,List, ListItem} from 'native-base';
import { Font } from "expo";
import CardImage from './CardImage.js';



export default class Historico extends React.Component {

  static id_usuario = 1; //provisório

static navigationOptions = {
    title: 'Histórico',
  };

constructor(){
  super();
  this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
  this.state = {refreshing: false,basic: true,isReady: false,lista:[]};
}

_onRefresh = () => {
    this.setState({refreshing: true});
    fetch('http://192.168.1.14/api/retiradas/'+1)
    .then(resposta => resposta.json())
    .then(json => this.setState({lista: json}))
    .then(() => {
      this.setState({refreshing: false});
    });
  }

componentDidMount(){
  fetch('http://192.168.1.14/api/retiradas/'+1)
    .then(resposta => resposta.json())
    .then(json => this.setState({lista: json}));
}




async componentWillMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({isReady:true})
  }

  render() {
    if (!this.state.isReady) { return <Expo.AppLoading />; }
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    return (
      <Container style={{marginTop: 20}}>
      <ScrollView 
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }>
          
          <FlatList
		        data={this.state.lista}
		        keyExtractor={item => item.id.toString()}
		        renderItem={ ({item}) =>
		        	<View>
		        	<CardImage nome={item.produto.nome} quantidade={item.quantidade} />
		        	</View>
		        }
		      />
      </ScrollView>
      </Container>
      );
  }
}


