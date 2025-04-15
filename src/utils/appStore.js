import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import connectionReducer from "./connectionSlice";
import requestReducer from "./requestSlice";

// Combine all your reducers
const rootReducer = combineReducers({
  user: userReducer,
  feed: feedReducer,
  connections: connectionReducer,
  requests: requestReducer
});

// Wrap the rootReducer with persistReducer
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "connection"] // 👈 persist only the `user` slice
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const appStore = configureStore({
  reducer: persistedReducer,
  devTools: {
    serialize: true // ✅ helps DevTools show nested data correctly
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
});

export const persistor = persistStore(appStore);
export default appStore;
