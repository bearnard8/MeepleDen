import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
// import '../node_modules/react-bootstrap/bootstrap/dist/css/bootstrap.min.css'; 
import Home from "./views/Home";
import Den from "./views/Den";
import Profile from "./views/Profile";
import GameSearchResults from "./views/GameSearchResults.jsx";
import Login from "./views/Login";
import Signup from "./views/Signup";
import MyNav from "./components/navbar/MyNav";
import MyFooter from "./components/footer/MyFooter";
// import Den
// import Profile

function App() {
  return (
    <Router>
      <AuthProvider>
        <MyNav />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/signup" exact element={<Signup />} />
          <Route path="/den/:denId" exact element={<Den />} />
          <Route path="/meeple/:meepleId" exact element={<Profile />} />
          <Route path="/search" exact element={<GameSearchResults />} />
          {/*<Route path="/about" exact element={About} />*/}
        </Routes>
      </AuthProvider>
      <MyFooter />
    </Router>
  );
}

export default App;
