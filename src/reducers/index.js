import { combineReducers } from 'redux';
import authReducer from './authReducer';
import reimbursementsReducer from './reimbursementsReducer';

export default combineReducers({
  authenticated: authReducer,
  reimbursements: reimbursementsReducer,
});
