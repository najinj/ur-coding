// src/js/components/App.jsx
import React from "react";
import { Provider } from "react-redux";
import store from "../store/index";
import RepositoryList from "./RepositoryList";

const App = () => (
  <Provider store={store}>
    <div className="row mt-5">
      <div className="col-md-4 offset-md-1">
        <h2>Repositories</h2>
        <RepositoryList />
      </div>
    </div>
  </Provider>
);

export default App;
