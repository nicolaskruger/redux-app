import {
  configureStore,
  ThunkAction,
  Action,
  PreloadedState,
  combineReducers,
} from "@reduxjs/toolkit";

import { userReducer } from "./features/user/userSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { loginReducer } from "./features/login/loginSlice";
import { postReducer } from "./features/post/postSlicer";

const rootReduce = combineReducers({
  user: userReducer,
  login: loginReducer,
  post: postReducer,
});

type RootState = ReturnType<typeof rootReduce>;

export function makeStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: rootReduce,
    preloadedState,
  });
}

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export default store;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
