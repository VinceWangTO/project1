import axios from 'axios';
import { CHANGE_AUTH, FETCH_ERROR_MESSAGE } from './types';
import { BASE_URL, HEADER_OPTIONS, getCookie } from '../lib/config';

export const login = (data) => async (dispatch) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/login`,
      data,
      HEADER_OPTIONS
    );
    if (response.status === 200) {
      const user = response.data;
      delete user.password;
      dispatch({ type: CHANGE_AUTH, payload: user });
      //dispatch({ type: FETCH_ERROR_MESSAGE, payload: '' });
    }
  } catch (e) {
    // dispatch({
    //   type: FETCH_ERROR_MESSAGE,
    //   payload: 'Wrong user name or password',
    // });
  }
};

export const logout = () => async (dispatch) => {
  dispatch({ type: CHANGE_AUTH, payload: false });
};
