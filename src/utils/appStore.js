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

const persistConfig = {
  key: "root",
  storage
};

const persistedReducer = persistReducer(persistConfig, userReducer);

const appStore = configureStore({
  reducer: {
    user: persistedReducer
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
