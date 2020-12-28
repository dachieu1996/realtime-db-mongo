import { Message } from './../../models/message';
import { User } from './../../models/User';
import { Action, createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';


export enum UserActionTypes {
  AllUsersRequested = '[List Users] All Users Requested',
  AllUsersLoaded = '[Users API] All Users Loaded',
  AllUsersCancelled = '[Users API] All Users Cancel',
}

export const allUsersRequestedAction = createAction(UserActionTypes.AllUsersRequested);
export const allUsersLoadedAction = createAction(UserActionTypes.AllUsersLoaded, props<{ users: User[] }>());
export const allUsersCancelledAction = createAction(UserActionTypes.AllUsersCancelled);
