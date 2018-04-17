import {
  RECEIVE_DECKS,
  REMOVE_DECK,
  ADD_DECK,
  ADD_CARD
} from '../actions'

function entries(state = {}, action) {
  console.log(action.type)
  switch (action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks
      }
    case ADD_DECK:
      return {
        ...state,
        [action.deckname]: {
          title: action.deckname,
          questions: [],
        },
      }
    case ADD_CARD:
      state: state[action.deckname].questions.push(action.card);
      return {
        ...state
      }
    case REMOVE_DECK:
      delete state[action.deckname];
      return {
        ...state
      }
    default:
      return state
  }
}

export default entries
