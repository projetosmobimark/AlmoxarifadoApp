import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
export default class CardImage extends Component {
  render() {
    return (
        
        
          <Card>
            <CardItem>
                <Body>
                  <Text>{this.props.nome} - {this.props.quantidade}</Text>

                </Body>
            </CardItem>
          </Card>
        
    );
  }
}