import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./authSlice";
import feedReducer from "./feedSlice";
import connectionsSlice from './connectionSlice'
import requestSlice  from './RequestSlice'

const persistConfig = {
  key: "auth",
  storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

const appStore = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    feed: feedReducer,
    connections:connectionsSlice,
    requests:requestSlice,
  },
});

export const persistor = persistStore(appStore);
export default appStore;