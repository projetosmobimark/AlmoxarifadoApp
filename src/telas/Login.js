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
		this.state = {usuario:'',senha:'', usuario_objeto:''};
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
			
		    this.setState({usuario_objeto:responseJson});
		    this._signInAsync();
		})
		.catch((error) => {
		    alert(error);
		});;
	  
	}

	static navigationOptions = {
    title: 'Login',
  };

	_signInAsync = async () => {
	var objeto = this.state.usuario_objeto[0];
    await AsyncStorage.setItem('userToken', objeto.usuario);
    await AsyncStorage.setItem('id', objeto.id.toString());
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
				        onPress={() =>this.fazLogin()}
				      />
			</View>
			);
	}


}