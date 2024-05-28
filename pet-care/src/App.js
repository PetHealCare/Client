import logo from "./logo.svg";
import "./App.css";
import Home from "./HomePage/Home/Home";
import Login from "./Components/Login/Login";
import { AuthProvider } from "./Components/Login/Authen";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./Components/Login/SignUp";

function App() {
  return (
    <div className="App" id="wrapper">
      <AuthProvider>
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/signin" element={<Login />} />
            <Route exact path="/signup" element={<SignUp />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
