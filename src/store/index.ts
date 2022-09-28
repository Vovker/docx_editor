import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {templatesReducer} from "./reducers/templates.reducers";
import {categoriesReducer} from "./reducers/categories.reducer";
import StoreToLocal from "../utils/storeToLocal";

const rootReducer = combineReducers({
  templates: templatesReducer,
  categories: categoriesReducer
});

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: StoreToLocal.getStore()
});

store.subscribe(() => {
  StoreToLocal.setStore(store.getState());
});

export type AppState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
