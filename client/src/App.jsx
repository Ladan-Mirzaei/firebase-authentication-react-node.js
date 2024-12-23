import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
function App() {
  return (
    <>
      <div className="App" id="outer-container">
        <Navbar />
      </div>

      <div>
        <Outlet />
      </div>
    </>
  );
}

export default App;
