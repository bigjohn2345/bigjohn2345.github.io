import { createStore } from 'redux'

const localStorage = window.localStorage;

let NoteDefault = {
  note: localStorage.getItem('note'),
  apiKey: localStorage.getItem('kipalogAPI')
}

const DBReducer = (state = NoteDefault, action) => {
  switch (action.type) {
    case 'SAVE_NOTE':
      localStorage.setItem('note', action.note);
      return NoteDefault;
    case 'SHARE_NOTE':
      console.log('Publishing notes');
      return NoteDefault;
    case 'SET_CONFIG':
      localStorage.setItem('kipalogAPI', action.apiKey);
      return NoteDefault;
    default:
      return state;
  }
}

export default createStore(DBReducer);
