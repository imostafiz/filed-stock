import { combineReducers, configureStore } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  _placeholder: (state = null) => state,
});

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
