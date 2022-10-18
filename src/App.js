import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import MainPage from "./components/MainPage";
import {UserProvider} from "./UserContext";

function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<MainPage />} />
        <Route path="/:id" element={<MainPage />} />
      </Routes>
    </UserProvider>
  );
}

export default App;
