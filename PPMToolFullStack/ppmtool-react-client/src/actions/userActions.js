import {GET_ERRORS,SET_CURRENT_USER} from './types';
import axios from 'axios'
import {ROOT_URL} from '../Config'
import setJWTToken from '../securityUtils/setJWTToken'
import jwt_decode from 'jwt-decode'

export const signUp = (SignUp, history) => async dispatch => {
  try {
    await axios.post(`${ROOT_URL}/api/users/register`, SignUp)
    history.push("/signup")
    dispatch({type: GET_ERRORS, payload: {}})
  } catch (err) {
    dispatch({type: GET_ERRORS, payload: err.response.data})
  }
}

export const login = LoginRequest => async dispatch => {
  try {
    // make a login request call
    const res = await axios.post(`${ROOT_URL}/api/users/login`,LoginRequest)
    // Get the token from response data
    const {token} = res.data;
    //store the token in the local storage
    localStorage.setItem("jwtToken", token);
    // set the token into the header componenet
   setJWTToken(token)
    // decode the token
const decode = jwt_decode(token)
    // dispatch the payload to the reducers
    dispatch({
      type : SET_CURRENT_USER ,
      payload : decode
    })
  }catch(err){
    dispatch({
      type : GET_ERRORS ,
      payload : err.response.data
    })
  }
}

export const logout = () => dispatch => {
  localStorage.removeItem("jwtToken");
  setJWTToken(false);
  dispatch({
    type: SET_CURRENT_USER,
    payload: {}
  });
};
