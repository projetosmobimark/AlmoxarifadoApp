import React from 'react';
import { View,
	ListView, 
	ScrollView ,
	RefreshControl ,
	TextInput 
	, Button,
	AsyncStorage
} from 'react-native';

import { Container, Header, Content, Footer, FooterTab, Icon,Text,List, ListItem} from 'native-base';


export default class Login extends React.Component {
	static navigationOptions = {
    title: 'Login Almoxarifado App',
  };

  	constructor(){
		super();
		this.state = {usuario:'',senha:''};
	}

	fazLogin(){
		  fetch('http://192.168.1.14/api/login', {
		  method: 'POST',
		  headers: {
		    Accept: 'application/json',
		    'Content-Type': 'application/json',
		  },
		  body: JSON.stringify({
		    usuario: this.state.usuario,
		    senha: this.state.senha,
		  }),
		  
		})
		.then((response) => response.json())
		.then((responseJson) => {
		    _signInAsync();
		})
		.catch((error) => {
		    alert(error);
		});;
	  
	}

	static navigationOptions = {
    title: 'Please sign in',
  };

	_signInAsync = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
    await AsyncStorage.setItem('senha', '1234');
    this.props.navigation.navigate('App');
  };

	render(){
		const {navigate} = this.props.navigation;
		return(
			<View styple={{marginTop: 100}}>
				<TextInput placeholder="usuario" 
					onChangeText={texto => this.setState({usuario : texto})} />

				<TextInput placeholder="senha" 
					onChangeText={texto => this.setState({senha : texto})} />
				<Button title="Entrar"
				        onPress={this._signInAsync}
				      />
			</View>
			);
	}


}