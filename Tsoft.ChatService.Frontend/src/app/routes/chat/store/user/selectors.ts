import { AppState } from './../state';
import { User } from './../../models/user';
import { createSelector } from "@ngrx/store";

export const selectAllUsers = createSelector(
  (state: AppState) => state.users.data,
  (users: Array<User>) => users
);
export const selectLoadingUser = createSelector(
  (state: AppState) => state.users.loading,
  (loading: boolean) => loading
)
