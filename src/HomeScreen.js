import React from 'react';
import { View,ListView, ScrollView ,RefreshControl,AsyncStorage  } from 'react-native';
import { Container, Header, Content, Footer, FooterTab, Button, Icon,Text,List, ListItem} from 'native-base';
import { Font , AppLoading} from "expo";
import FooterTabsIconText from "./FooterTabsIconText.js"
import CardImage from "./CardImage.js"
import firebase from '../firebase.js';



export default class App extends React.Component {

static navigationOptions = {
    title: 'Produtos',
  };

constructor(){
  super();
  this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
  this.state = {refreshing: false,basic: true,isReady: false,lista:[], id_user: '', flag:''};
  this.unsubscribe = null;
  this.ref = firebase.firestore().collection('flag');
}

onCollectionUpdate = (querySnapshot) => {
  querySnapshot.forEach((doc) => {
    const flag_a = doc.data();
    this.setState({flag:flag_a});
    fetch('http://mobilaravel.herokuapp.com/api/produtos')
    .then(resposta => resposta.json())
    .then(json => this.setState({lista: json}));
    
  });
  
}

notificaMudanca = () => {
  const updateRef = firebase.firestore().collection('flag').doc('1bmaN5GzDYvhT508NUbh');

  updateRef.get().then((doc) => {
      if(doc.data().flag){
        updateRef.set({
          flag: false
        });
      }else{
        updateRef.set({
          flag: true
        });
      }

  }  );
  
    
}

_onRefresh = () => {
    this.setState({refreshing: true});
    fetch('http://mobilaravel.herokuapp.com/api/produtos')
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
  this._setIdUsuario();
  this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  fetch('http://mobilaravel.herokuapp.com/api/produtos')
    .then(resposta => resposta.json())
    .then(json => this.setState({lista: json}))
}

retiraProduto(id){
  fetch('http://mobilaravel.herokuapp.com/api/retiradas', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    produto_id: id,
    usuario_id: this.state.id_user,
    quantidade: '1',
  }),
});
  
  setTimeout(() => this._onRefresh(), 200);
  this.notificaMudanca();

}

_setIdUsuario = async () => {
    const id_user = await AsyncStorage.getItem('id');
    this.setState({id_user:id_user});
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


