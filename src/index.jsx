import { render } from "react-dom";
import React from "react";
import App from "./components/App";

const renderApp = () => {
  render(<App />, document.getElementById("root"));
};

renderApp();

if (module.hot) {
  module.hot.accept("./components/App", function() {
    console.log("Accepting the updated footer module!");
    renderApp();
  });
}
