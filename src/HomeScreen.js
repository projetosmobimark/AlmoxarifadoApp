import React from 'react';
import { View,ListView, ScrollView ,RefreshControl,AsyncStorage  } from 'react-native';
import { Container, Header, Content, Footer, FooterTab, Button, Icon,Text,List, ListItem} from 'native-base';
import { Font , AppLoading} from "expo";
import FooterTabsIconText from "./FooterTabsIconText.js"
import CardImage from "./CardImage.js"



export default class App extends React.Component {

static navigationOptions = {
    title: 'Lista Produtos',
  };

constructor(){
  super();
  this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
  this.state = {refreshing: false,basic: true,isReady: false,lista:[]};
 
}

_onRefresh = () => {
    this.setState({refreshing: true});
    fetch('http://192.168.1.14/api/produtos')
    .then(resposta => resposta.json())
    .then(json => this.setState({lista: json}))
    .then(() => {
      this.setState({refreshing: false});
    });
  }

  _goToHist = () => {
    this.props.navigation.navigate('Historico');
  }

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };

componentDidMount(){
  fetch('http://192.168.1.14/api/produtos')
    .then(resposta => resposta.json())
    .then(json => this.setState({lista: json}))
}

retiraProduto(id){
  fetch('http://192.168.1.14/api/retiradas', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    produto_id: id,
    usuario_id: '1',
    quantidade: '1',
  }),
});
  
  setTimeout(() => this._onRefresh(), 200);
  

}

_bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    const senha = await AsyncStorage.getItem('senha');
    console.warn(userToken + senha);
  };

async componentWillMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({isReady:true})
  }

  render() {
    const {navigate} = this.props.navigation;
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
        }
      >
      
        <Content>
          <List
            leftOpenValue={75}
            dataSource={this.ds.cloneWithRows(this.state.lista)}
            renderRow={data =>
              <ListItem>
                  <View>
                    <Text>{data.nome}</Text>
                    <Text note>quatidade : {data.quantidade}</Text>
                  </View>  
              </ListItem>}
            renderLeftHiddenRow={data =>
              <Button full onPress={() => this.retiraProduto(data.id)}>
                <Icon active name="md-cart" />
              </Button>}
            
          />
          

        </Content>
        
      
      </ScrollView>
      <Footer>
          <FooterTab>
            <Button vertical onPress={() => this._goToHist()}>
              <Icon name="list" />
              <Text>Histórico</Text>
            </Button>

            <Button danger vertical onPress={this._signOutAsync}>
              <Icon name="log-out" />
              <Text>Sair</Text>
            </Button>
            
            
          </FooterTab>
        </Footer>
      </Container>
      );
  }
}


