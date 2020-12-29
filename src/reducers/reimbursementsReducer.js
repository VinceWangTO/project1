/* eslint-disable import/no-anonymous-default-export */
import {
  GET_ALL_REIMBURSEMENTS,
  GET_MY_REIMBURSEMENTS,
} from '../actions/types';
export default function (state = false, action) {
  switch (action.type) {
    case GET_ALL_REIMBURSEMENTS:
      return action.payload;
    case GET_MY_REIMBURSEMENTS:
      return action.payload;
    default:
      return state;
  }
}
