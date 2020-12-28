import { User } from './../../models/user';
import { allUsersLoadedAction } from './user.action';
import { createReducer, on } from '@ngrx/store';

import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export interface UsersState extends EntityState<User> {
  loading: boolean;
}


export const adapter: EntityAdapter<User> = createEntityAdapter<User>();


export const initialUsersState: UsersState = adapter.getInitialState({
  loading: true
});

export const usersReducer = createReducer(
  initialUsersState,
  on(allUsersLoadedAction, (state, action) => {
    return adapter.setAll(action.users, { ...state, loading: false })
  })
);

export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal
} = adapter.getSelectors();
