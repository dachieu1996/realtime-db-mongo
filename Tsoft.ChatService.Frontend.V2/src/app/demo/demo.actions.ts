import { createAction, props } from '@ngrx/store';

export const loadDemos = createAction(
  '[Demo] Load Demos'
);

export const loadDemosSuccess = createAction(
  '[Demo] Load Demos Success',
  props<{ data: any }>()
);

export const loadDemosFailure = createAction(
  '[Demo] Load Demos Failure',
  props<{ error: any }>()
);
