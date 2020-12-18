import { UserState } from './state';
import { User } from './../../models/user';
import { createReducer, on, Action } from '@ngrx/store';
import { loadUsersSuccessAction, loadUsersAction } from './actions';


export const initialState: UserState = {
  data: [],
  loading: true
}

export const usersReducer = createReducer(
  initialState,
  on(loadUsersSuccessAction, (state, action) => {
    console.log('eeeeeeeeeeeeee', action)
    return { data: action.users, loading: false }
  }),
  on(loadUsersAction, (state) => ({ ...state, loading: true }))
);
