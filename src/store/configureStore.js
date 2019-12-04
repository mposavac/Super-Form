import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { devToolsEnhancer } from "redux-devtools-extension";

import formReducer from "./reducers";

const persistConfig = {
  key: "formData",
  storage
};

const persistedReducer = persistReducer(persistConfig, formReducer);

export default () => {
  let store = createStore(persistedReducer, devToolsEnhancer());
  let persistor = persistStore(store);
  return { store, persistor };
};
