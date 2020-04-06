import React from 'react';
import * as actionTypes from '../Actions/actionTypes';

const initialState = {
  loggedIn: false,
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