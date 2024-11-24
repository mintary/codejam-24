import "./App.css";
import Nav from "./components/Nav";
import Game from "./components/Game";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthProvider from "./components/AuthProvider";
import LoginScreen from "./screens/LoginScreen";
import GameScreen from "./screens/GameScreen";
import SignupScreen from "./screens/SignupScreen";

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <header className="App-header">
            <Nav />
          </header>
          <Routes>
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/signup" element={<SignupScreen />} />
            <Route path="/" element={<GameScreen />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
