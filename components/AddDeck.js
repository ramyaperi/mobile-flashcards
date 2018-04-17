import React, {Component} from 'react'
import {View, Text, TextInput, Button} from 'react-native'
import {saveDeckTitle} from '../utils/api'
import {connect} from 'react-redux'

class AddDeck extends Component {

  state = {
    deckId: ""
  }

  render() {
    return (<View style={{
        flex: 1
      }}>
      <Text style={{
          height: 40
        }}>"Enter Deck name: "</Text>
      <TextInput style={{
          height: 40
        }} placeholder="Enter Deck name:" onChangeText={(deckId) => this.setState({deckId})}/>
      <Button onPress={() => {
          saveDeckTitle(this.state.deckId),
          this.props.navigation.navigate('Home')
        }} title="Add Deck"/>
    </View>)
  }
}

export default connect()(AddDeck);
