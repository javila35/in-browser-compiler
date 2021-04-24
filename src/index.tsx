import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "bulmaswatch/superhero/bulmaswatch.min.css";
import { CellList } from "./components";
import { store } from "./state";

const App = () => {
  return (
    <Provider store={store}>
      <CellList />
    </Provider>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
