export type Map<T extends string | symbol | number, U> = {
  [K in T]: U;
};
