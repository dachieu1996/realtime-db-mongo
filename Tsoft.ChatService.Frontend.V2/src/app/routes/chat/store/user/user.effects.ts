import { selectAllUsers } from './user.selector';
import { User } from './../../models/user';
import { mergeMap, map } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { ChatHubService } from './../../service/chat-hub.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { filter, withLatestFrom } from 'rxjs/operators';
import { UserActionTypes, allUsersCancelledAction, allUsersLoadedAction } from './user.action';



@Injectable()
export class UserEffects {

  constructor(
    private actions$: Actions,
    private chatHubService: ChatHubService,
    private store: Store
  ) { }

  @Effect()
  loadAllUsers$ = this.actions$
    .pipe(
      ofType(UserActionTypes.AllUsersRequested),
      withLatestFrom(this.store.pipe(select(selectAllUsers))),
      filter(([action, allUsers]) => {
        if (allUsers.length > 0)
          return false;
        else
          return true;
      }),
      mergeMap(async (): Promise<User[]> => {
        let users = await this.chatHubService.getAllUsers().catch(err => {
          this.store.dispatch(allUsersCancelledAction());
          return [];
        })
        return users;
      }),
      map(users => allUsersLoadedAction({ users }))
    );

}
