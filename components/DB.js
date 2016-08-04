import { createStore } from 'redux'

const localStorage = window.localStorage;

let NoteDefault = {
  note: localStorage.getItem('note'),
  key: localStorage.getItem('key'),
  showConfig: false,
  showPublish: false
}

const DBReducer = (state = NoteDefault, action) => {
  switch (action.type) {
    case 'SAVE_NOTE':
      localStorage.setItem('note', action.note);
      return {
        ...state,
        note: action.note
      };
    case 'SHARE_NOTE':
      console.log('Publishing notes');
      return NoteDefault;
    case 'SET_CONFIG':
      localStorage.setItem('key', action.key);
      return {
        ...state,
        key: action.key
      };
    case 'SHOW_CONFIG':
      return {
        ...state,
        showConfig: true
      };
    case 'HIDE_CONFIG':
      localStorage.setItem('showConfig', false);
      return {
        ...state,
        showConfig: false
      };
    default:
      return state;
  }
}

export default createStore(DBReducer);
