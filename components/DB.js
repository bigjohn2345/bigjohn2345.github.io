import { createStore } from 'redux'

const localStorage = window.localStorage;

let NoteDefault = {
  note: localStorage.getItem('note'),
  key: localStorage.getItem('key'),
  showConfig: false,
  showPublish: false,
  message: ''
}

const DBReducer = (state = NoteDefault, action) => {
  switch (action.type) {
    case 'SAVE_NOTE':
      localStorage.setItem('note', action.note);
      return {
        ...state,
        note: action.note
      };
    case 'SHOW_SHARE':
      return {
        ...state,
        showPublish: true
      };
    case 'HIDE_SHARE':
      return {
        ...state,
        showPublish: false
      };
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
    case 'SHOW_MSG':
      return {
        ...state,
        message: action.msg
      };
    case 'HIDE_MSG':
      return {
        ...state,
        message: ''
      };
    default:
      return state;
  }
}

export default createStore(DBReducer);
