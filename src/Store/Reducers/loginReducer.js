import React from 'react';
import { fb } from '../../Firebase/firebase';
import * as actionTypes from '../Actions/actionTypes';

const initialState = {
  loggedIn: true,
  user: null,
}



const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case (actionTypes.SIGN_IN):
      return console.log('hello');
  }
  return state

}

export default loginReducer;