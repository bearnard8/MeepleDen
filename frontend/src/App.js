import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
// import '../node_modules/react-bootstrap/bootstrap/dist/css/bootstrap.min.css'; 
import Welcome from "./views/Welcome.jsx";
import About from "./views/About.jsx";
import Login from "./views/Login";
import Signup from "./views/Signup";
import Home from "./views/Home";
import GameSearchResults from "./views/GameSearchResults.jsx";
import Den from "./views/Den";
import Profile from "./views/Profile";
import SurveyResponse from "./components/survey/SurveyResponse.jsx";
import CreateDenForm from "./views/CreateDen.jsx";
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
          <Route path="/" exact element={<Welcome />} />
          <Route path="/home" exact element={<Home />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/signup" exact element={<Signup />} />
          <Route path="/den/:denId" exact element={<Den />} />
          <Route path="/meeple/:meepleId" exact element={<Profile />} />
          <Route path="/search" exact element={<GameSearchResults />} />
          <Route path="/survey/:surveyId" element={<SurveyResponse />} />
          <Route path="/about" exact element={<About />} />
          <Route path="/create-den" element={<CreateDenForm />} />
        </Routes>
      </AuthProvider>
      <MyFooter />
    </Router>
  );
}

export default App;
