import {AsyncStorage} from 'react-native'
import {addDeck, receiveDecks, deleteDeck, addCard} from '../actions'

export const FLASH_CARD_STORAGE_KEY = 'FLashCard:Decks'

//AsyncStorage.removeItem(FLASH_CARD_STORAGE_KEY);

export function getDecks() {
  return(dispatch) => {
    AsyncStorage.getItem(FLASH_CARD_STORAGE_KEY).then(JSON.parse).then((decks) => {
      dispatch(receiveDecks(decks))
    });
  };
}

export function removeDeck(deckid) {
  console.log(deckid);
  return(dispatch) => {
    AsyncStorage.getItem(FLASH_CARD_STORAGE_KEY).then(JSON.parse).then((data) => {
      data[deckid] = undefined
      delete data[deckid]
      console.log(data);
      AsyncStorage.setItem(FLASH_CARD_STORAGE_KEY, JSON.stringify(data))
      dispatch(deleteDeck(deckid))
      console.log("dispatch done")
    })
  }
}

export function saveDeckTitle(deckid) {
  return AsyncStorage.mergeItem(FLASH_CARD_STORAGE_KEY, JSON.stringify({
    [deckid]: {
      title: deckid,
      questions: []
    }
  }))
  dispatch(addDeck(deckId))

}

export function addCardToDeck(deckid, cardData) {
  //console.log(deckid, cardData);
  return(dispatch) => {
    AsyncStorage.getItem(FLASH_CARD_STORAGE_KEY).then(JSON.parse).then((result) => {
      const decks = new Map(Object.entries(result));
      if (decks.get(deckid) != null) {
        AsyncStorage.mergeItem(FLASH_CARD_STORAGE_KEY, JSON.stringify({
          [deckid]: {
            questions: decks.get(deckid).questions.concat(cardData)
          }
        }))
      }
    })
    dispatch(addCard(deckid, cardData))
  }
}
