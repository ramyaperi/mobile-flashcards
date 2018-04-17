import React, { Component } from 'react'
import { View, Text ,TextInput,Button} from 'react-native'
import {addCardToDeck} from '../utils/api'
import { connect } from 'react-redux'

class AddCard extends Component {

  render() {
    return(
      <View style={{flex: 1}}>
        <Text style={{height: 70}}>"Enter Question: "</Text>
        <TextInput
          style={{height: 40}}
          placeholder="Question?"
          onChangeText={(question) => this.setState({question})}
        />
      <Text style={{height: 70}}>"Enter Answer: "</Text>
        <TextInput
          style={{height: 40}}
          placeholder="Answer"
          onChangeText={(answer) => this.setState({answer})}
        />
        <Button
          onPress={() => {
            //console.log(this.props.navigation.state.params.deckId),
            this.props.addCard(this.props.navigation.state.params.deckId,this.state),
            this.props.navigation.goBack()
          }}
          title="Add Card"
        />
      </View>
    )
  }
}

const mapStateToProps = (state) =>  {
  return {
    deckList : state,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addCard: (deckId,state) => dispatch(addCardToDeck(deckId , state))
  };
};


export default connect(mapStateToProps,mapDispatchToProps) (AddCard)
