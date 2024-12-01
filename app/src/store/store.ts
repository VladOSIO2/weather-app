import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './user/user.slice';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './sagas';
import { weatherSlice } from './weather/weather.slice';
import { favoriteCitiesSlice } from './favoriteCities/favoriteCities.slice';

export const makeStore = () => {
  const sagaMiddleware = createSagaMiddleware();

  const store = configureStore({
    reducer: {
      [userSlice.name]: userSlice.reducer,
      [weatherSlice.name]: weatherSlice.reducer,
      [favoriteCitiesSlice.name]: favoriteCitiesSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(sagaMiddleware),
  });

  sagaMiddleware.run(rootSaga);

  return store;
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
