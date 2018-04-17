import React from 'react';
import { StyleSheet, Text, View, StatusBar , Button } from 'react-native'
import { StackNavigator } from 'react-navigation'
import DeckDetail from './components/DeckDetail'
import DeckList from './components/DeckList'
import AddDeck from './components/AddDeck'
import AddCard from './components/AddCard'
import StartQuiz from './components/StartQuiz'
import { purple, white ,blue} from './utils/colors'
import { Provider } from 'react-redux'
import { createStore , applyMiddleware, compose} from 'redux'
import { Constants } from 'expo'
import reducer from './reducers'
import thunk from 'redux-thunk'
import { setLocalNotification } from './utils/helpers'

function FlashCardStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const MainNavigator = StackNavigator({
  Home: {
    screen: DeckList,
  },
  DeckDetail: {
    screen: DeckDetail,
  },
  AddDeckScreen:{
    screen : AddDeck,
    navigationOptions: {
      mode: 'modal',
    }
  },
  AddCardScreen:{
    screen : AddCard,
    navigationOptions: {
      mode: 'modal',
    }
  },
  StartQuizScreen:{
    screen : StartQuiz,
    navigationOptions: {
      mode: 'modal',
    }
  },
},{
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      },
    },
  });

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  const store = createStore(reducer,
    composeEnhancers(
     applyMiddleware(thunk)
   ))

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification()
  }
  render() {
    return (
      <Provider store={store}>
      <View style={{flex: 1}}>
        <FlashCardStatusBar backgroundColor={purple} barStyle="light-content" />
        <MainNavigator />
      </View>
       </Provider>
    );
  }
}
