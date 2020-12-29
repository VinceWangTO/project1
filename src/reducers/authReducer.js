/* eslint-disable import/no-anonymous-default-export */
import { CHANGE_AUTH } from '../actions/types';
export default function (state = false, action) {
  switch (action.type) {
    case CHANGE_AUTH:
      return action.payload;
    // case UPDATE_USER_SELF:
    //      state.email = action.payload.email;
    //      state.firstName = action.payload.firstName;
    //      state.lastName = action.payload.lastName;
    //      state.phone = action.payload.phone;
    //      state.userName = action.payload.userName;
    //      return state;
    default:
      return state;
  }
}
