

import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromUser from "./user.reducer"

export const selectUsersState = createFeatureSelector<fromUser.UsersState>("users");

export const selectAllUsers = createSelector(
  selectUsersState,
  fromUser.selectAll
);

export const selectAllUsersLoading = createSelector(
  selectUsersState,
  userState => userState.loading
);

