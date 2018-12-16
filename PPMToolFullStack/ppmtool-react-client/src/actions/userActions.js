import {GET_ERRORS, SIGN_UP} from './types';
import React from 'react'
import axios from 'axios'
import {ROOT_URL} from '../Config'

export const signUp = (SignUp, history) => async dispatch => {
  try {
    const res = await axios.post(`${ROOT_URL}/api/users/register`, SignUp)
    history.push("/signup")
    dispatch({type: GET_ERRORS, payload: {}})
  } catch (err) {
    dispatch({type: GET_ERRORS, payload: err.response.data})
  }
}

export const login = LoginRequest => async dispatch => {
 // make a login request call
 // Get the token from response data
 //store the token in the local storage
 // set the token into the header componenet
 // decode the token
 // dispatch the payload to the reducers
}
