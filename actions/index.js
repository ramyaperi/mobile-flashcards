export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const ADD_CARD = 'ADD_CARD'
export const REMOVE_DECK = 'REMOVE_DECK'

export function receiveDecks (decks) {
    //console.log("recieve decks " + decks)
  return {
    type: RECEIVE_DECKS,
    decks,
  }
}

export function addCard(deckname,card){
  return{
    type: ADD_CARD,
    deckname,
    card
  }
}

export function addDeck (deckname) {
  return {
    type: ADD_DECK,
    deckname,
  }
}

export function deleteDeck (deckname) {
  return {
    type: REMOVE_DECK,
    deckname,
  }
}
