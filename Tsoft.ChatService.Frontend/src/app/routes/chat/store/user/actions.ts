import { User } from './../../models/user';
import { Action, createAction, props } from '@ngrx/store';

export enum ActionTypes {
  LOAD_USERS = '[User] Load Users',
  LOAD_USERS_SUCCESS = '[User] Load Users Success',
  LOAD_USERS_FAIL = '[User] Load Users Fail'
}


export const loadUsersAction = createAction(ActionTypes.LOAD_USERS)
export const loadUsersSuccessAction = createAction(ActionTypes.LOAD_USERS_SUCCESS, props<{ users: User[] }>())
export const loadUsersFailAction = createAction(ActionTypes.LOAD_USERS_FAIL, props<{ users: User[] }>())
