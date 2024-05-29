import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
// import '../node_modules/react-bootstrap/bootstrap/dist/css/bootstrap.min.css'; 
import Home from "./views/home";
import Login from "./views/login";
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
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
          {/*<Route path="/about" exact component={About} />
          <Route path="/den" exact component={Den} />
          <Route path="/profile" exact component={Profile} />*/}
        </Routes>
      </AuthProvider>
      <MyFooter />
    </Router>
  );
}

export default App;
