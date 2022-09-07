import "./App.css";
import Home from "./pages/Home";
import { data } from "./data";

function App() {
  let ls = JSON.parse(localStorage.getItem("enveritas"));

  if (!ls) {
    localStorage.setItem("enveritas", JSON.stringify(data));
    ls = JSON.parse(localStorage.getItem("enveritas"));
  }
  return (
    <div className="App">
      <Home data={ls} />
    </div>
  );
}

export default App;

