import React, {Component} from 'react'
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Animated
} from 'react-native'
import {connect} from 'react-redux'
import {getDecks, removeDeck} from '../utils/api'
import {FontAwesome} from '@expo/vector-icons'
import {white} from '../utils/colors'

class DeckDetail extends Component {

  state = {
    opacity: new Animated.Value(0),
  }

  componentDidMount() {
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 1000
    }).start();
    this.props.fetchData();
    this.props.navigation.setParams({delete: this.props.delete});
  }

  static navigationOptions = ({navigation, dispatch}) => {
    const {deckId} = navigation.state.params;
    return {
      title: deckId, headerRight: (<TouchableOpacity style={styles.button} onPress={() => {
          navigation.goBack(),
          navigation.state.params.delete(navigation.state.params.deckId)
        }}>
        <FontAwesome name='trash' color={white} size={30}/>
      </TouchableOpacity>),
      /* the rest of this config is unchanged */

    }
  }
  render() {
    let {opacity} = this.state;
    if (typeof this.props.deckList === "undefined" || typeof this.props.deckList[this.props.navigation.state.params.deckId] === "undefined") {
      return (<View style={{
          flex: 1
        }}>
        <Text>"Loading.. "</Text>
      </View>)
    }
    return (<Animated.View style={{
        flex: 1,
        opacity
      }}>
      <Text style={styles.heading}>Deck Deatils</Text>
      <Text style={styles.heading}>{this.props.deckList[this.props.navigation.state.params.deckId].questions.length}
         cards</Text>
      {
        this.props.deckList[this.props.navigation.state.params.deckId].questions.length > 0 && <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('StartQuizScreen', {deckId: this.props.navigation.state.params.deckId})}>
            <Text style={styles.text}>Start Quiz</Text>
          </TouchableOpacity>
      }
      <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('AddCardScreen', {deckId: this.props.navigation.state.params.deckId})}>
        <Text style={styles.text}>Add Card</Text>
      </TouchableOpacity>
    </Animated.View>)
  }
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 30,
    textAlign: 'center',
    lineHeight: 150
  },
  button: {
    padding: 2,
    justifyContent: 'center',
    alignItems: 'center',
    height: 60
  },
  text: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
    padding: 4,
    textAlign: 'center',
    borderWidth: 1,
    borderRadius: 10
  }
});

const mapStateToProps = (state) => {
  return {deckList: state}
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: () => dispatch(getDecks()),
    delete: (deckid) => dispatch(removeDeck(deckid))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeckDetail)
