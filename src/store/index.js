import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "../reducers";

const initialState = {};

const middleware = [thunk];

const composeEnhancers =
  (process.env.NODE_ENV === "development" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
  // blacklist: ["error"]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const configureStore = () => {
  const store = createStore(
    persistedReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middleware))
  );

  if (process.env.NODE_ENV !== "production") {
    if (module.hot) {
      module.hot.accept("../reducers", () => {
        store.replaceReducer(rootReducer);
      });
    }
  }

  const persistor = persistStore(store);

  return { store, persistor };
};

export default configureStore;
