import React from 'react';
import { View,
	ListView, 
	ScrollView ,
	RefreshControl ,
	TextInput 
	, Button,
	AsyncStorage
} from 'react-native';

import {Input, Container, Header, Content, Footer, FooterTab, Icon,Text,List, ListItem,Item,Form,Label} from 'native-base';


export default class Login extends React.Component {
	static navigationOptions = {
    title: 'Login Almoxarifado App',
  };

  	constructor(){
		super();
		this.state = {usuario:'',senha:'', usuario_objeto:''};
	}

	fazLogin(){
		  fetch('http://mobilaravel.herokuapp.com/api/login', {
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
    await AsyncStorage.setItem('userToken', objeto.nome);
    await AsyncStorage.setItem('id', objeto.id.toString());
    this.props.navigation.navigate('App');
  };

	render(){
		const {navigate} = this.props.navigation;
		return(
			<Container>
	        <Content>
	          <Form>	
	            <Item floatingLabel>
	              <Label>Usuario</Label>
	              <Input type="text"  
					onChangeText={texto => this.setState({usuario : texto})} />
	            </Item>
	            <Item floatingLabel last>
	              <Label>Senha</Label>
	              <Input type="password" 
					onChangeText={texto => this.setState({senha : texto})} />
	            </Item>
	            <Button title="Entrar"
				        onPress={() =>this.fazLogin()}
				      />
	          </Form>
	        </Content>
	      </Container>
			);
	}


}