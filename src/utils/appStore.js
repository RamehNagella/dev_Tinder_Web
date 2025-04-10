/*
import { configureStore } from "@reduxjs/toolkit";
import { useReducer } from "react";
import feedReducer from "./feedSlice";

const appStore = configureStore({
  reducer: {
    user: useReducer,
    feed: feedReducer
  }
});

export default appStore;
*/

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

// Combine all your reducers
const rootReducer = combineReducers({
  user: userReducer,
  feed: feedReducer
});

// Wrap the rootReducer with persistReducer
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"] // 👈 persist only the `user` slice
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const appStore = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
});

export const persistor = persistStore(appStore);
export default appStore;
/*
import { configureStore } from "@reduxjs/toolkit";
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

const persistConfig = {
  key: "root",
  storage
};

const persistedReducer = persistReducer(persistConfig, userReducer);

const appStore = configureStore({
  reducer: {
    user: persistedReducer,
    feed: feedReducer
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
*/
// import { configureStore } from "@reduxjs/toolkit";
// import useReducer from "./userSlice";
// import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
// import persistReducer from "redux-persist/es/persistReducer";
// import persistStore from "redux-persist/es/persistStore";

// const persistConfig = {
//   key: "root",
//   storage
// };

// const persistedReducer = persistReducer(persistConfig, useReducer);

// const appStore = configureStore({
//   reducer: {
//     user: persistedReducer
//   }
// });

// export const persistor = persistStore(appStore);

// export default appStore;
