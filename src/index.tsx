import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { CellList } from "./components";
import { store } from "./state";
import "bulmaswatch/superhero/bulmaswatch.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const App = () => {
  return (
    <Provider store={store}>
      <CellList />
    </Provider>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
