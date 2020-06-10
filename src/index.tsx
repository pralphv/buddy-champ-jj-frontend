import React from "react";
import ReactDOM from "react-dom";

import "./index.css";

function render() {
  const App = require("./app/App").default;
  ReactDOM.render(<App />, document.getElementById("root"));
}

render();
