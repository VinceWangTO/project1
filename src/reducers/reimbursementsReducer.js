/* eslint-disable import/no-anonymous-default-export */
import {
  GET_ALL_REIMBURSEMENTS,
  GET_MY_REIMBURSEMENTS,
  UPDATE_REIMBURSEMENT,
  ADD_REIMBURSEMENT,
} from '../actions/types';
export default function (state = false, action) {
  switch (action.type) {
    case GET_ALL_REIMBURSEMENTS:
      return action.payload;
    case GET_MY_REIMBURSEMENTS:
      return action.payload;
    case ADD_REIMBURSEMENT:
      return [...state, ...action.payload];
    case UPDATE_REIMBURSEMENT:
      return state.map((reimbursement) => {
        if (reimbursement.reimbursementId === action.payload.reimbursementId) {
          // Return a new object
          return action.payload;
        }
        return reimbursement;
      });
    default:
      return state;
  }
}
