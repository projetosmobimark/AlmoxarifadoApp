import React, { Component } from 'react';
import { View,Button } from 'react-native';
import {Content,Container,Input,Text,Item,Form,Label} from 'native-base';

import { connect } from 'react-redux';  
import { bindActionCreators } from 'redux';
import { clickButton } from './actions';

class TelaTeste extends Component {

  state = {
    inputValue: ''
  }

  render() {
    const {
      clickButton,
      newValue
    } = this.props;
    const { inputValue } = this.state;

    return (
      <Container>
          <Content>
            <Form>  
              <Item floatingLabel>
                <Label>Teste</Label>
                <Input type="text" onChangeText={texto => this.setState({inputValue : texto})}/>
              </Item>
              <Button title="Entrar" onPress={() => clickButton(inputValue)}
              />

              <Text>{newValue}</Text>
            </Form>
          </Content>
        </Container>
    );
  }
}

const mapStateToProps = store => ({
  newValue: store.clickState.newValue
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ clickButton }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TelaTeste);