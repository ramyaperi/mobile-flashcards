import React, { Component } from 'react'
import { View, Text , TouchableOpacity , Button,FlatList, AsyncStorage,StyleSheet} from 'react-native'
import DeckDetail from './DeckDetail'
import { connect } from 'react-redux'
import {getDecks} from '../utils/api'



class DeckList extends Component {

  componentDidMount(){
    this.props.fetchData();
  }

  static navigationOptions = ({ navigation }) => {

    return {
      title: `Home`,
      headerRight: (
        <Button
          onPress={() => navigation.navigate('AddDeckScreen')}
          title="AddDeck"
          color="#fff"
          />
      )
      /* the rest of this config is unchanged */
      /*{Array.from(this.props.deckList.keys())}*/
    };
  };

  delteDeck = () =>
  {

  }

  render() {

    if(typeof this.props.deckList === "undefined"){
      return (<View style={{flex: 1}}><Text>"Loading.. "</Text></View>)
    }
    return (
      deckList = new Map(Object.entries(this.props.deckList)),
      <View style={{flex: 1}}>
        <FlatList data = {Array.from(deckList.keys())}
          renderItem={({item}) => (
          <TouchableOpacity style={styles.deckview}
            onPress={() => this.props.navigation.navigate(
              'DeckDetail',
               {deckId:item}
            )}>
            <Text style={styles.deckname}>{item}</Text>
            <Text style={styles.deckname}>{deckList.get(item).questions.length} cards</Text>
          </TouchableOpacity>)}
          />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  deckview:{
    flex: 1,
    padding : 5,
    borderWidth : 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    height: 70
  },
  deckName: {
    flex: 1,
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 60,
    textAlign: 'center',
  },
});

const mapStateToProps = (state) =>  {
  return {
    deckList : state,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: () => dispatch(getDecks()),
  };
};


export default connect(mapStateToProps,mapDispatchToProps)(DeckList)
