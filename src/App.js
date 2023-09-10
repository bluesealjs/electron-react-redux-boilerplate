import "./assets/css/App.css";
import React, { Component } from "react";

import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "./store/index";

import ErrorBoundary from "./ErrorBoundary";

import Home from "./components/Home";
import NotFound from "./components/not-found/NotFound";

//for Hot reloading
const { store, persistor } = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <ErrorBoundary>
              <div className="app">
                <Switch>
                  <Route exact path="" component={Home} />
                  <Route exact path="/*" component={NotFound} />
                </Switch>
              </div>
            </ErrorBoundary>
          </Router>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
