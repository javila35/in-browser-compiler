import * as React from "react";
import ReactDOM from "react-dom";
import "bulmaswatch/superhero/bulmaswatch.min.css";
import { CodeCell } from "./components";

const App = () => {
  return (
    <div>
      <CodeCell />
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
