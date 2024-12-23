import { Outlet, useLocation } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
function App() {
  const location = useLocation();

  const isHome = location.pathname === "/" ? true : false;

  return (
    <>
      <div className="App" id="outer-container">
        <Navbar
          pageWrapId={"page-wrap"}
          outerContainerId={"outer-container"}
          homeOnly
        />
      </div>

      <div className={`root${isHome ? "home" : ""}`}>
        <Outlet />
      </div>
    </>
  );
}

export default App;
