import axios from 'axios';
import {
  GET_ALL_REIMBURSEMENTS,
  GET_MY_REIMBURSEMENTS,
  UPDATE_REIMBURSEMENT,
} from './types';
import { BASE_URL, HEADER_OPTIONS } from '../lib/config';

export const getAllReimbursements = () => async (dispatch) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/reimbursements`,
      HEADER_OPTIONS
    );
    if (response.status === 200) {
      const reimbursements = response.data;

      dispatch({ type: GET_ALL_REIMBURSEMENTS, payload: reimbursements });
      //dispatch({ type: FETCH_ERROR_MESSAGE, payload: '' });
    }
  } catch (e) {
    // dispatch({
    //   type: FETCH_ERROR_MESSAGE,
    //   payload: 'Wrong user name or password',
    // });
  }
};

export const getMyReimbursements = (userId) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/myreimbursements/${userId}`,
      HEADER_OPTIONS
    );
    if (response.status === 200) {
      const reimbursements = response.data;
      dispatch({ type: GET_MY_REIMBURSEMENTS, payload: reimbursements });
      //dispatch({ type: FETCH_ERROR_MESSAGE, payload: '' });
    }
  } catch (e) {}
};

export const updateReimbursement = (reimbursement) => async (dispatch) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/reimbursements`,
      reimbursement,
      HEADER_OPTIONS
    );
    if (response.status === 200) {
      const reimbursement = response.data;
      dispatch({ type: UPDATE_REIMBURSEMENT, payload: reimbursement });
      //dispatch({ type: FETCH_ERROR_MESSAGE, payload: '' });
    }
  } catch (e) {}
};
