export interface BaseState<T> {
  data: ReadonlyArray<T>
  error?: string;
  loading?: boolean;
}
