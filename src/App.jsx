import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./page/Home";
import Login from "./page/Login";
import Register from "./page/Register";
import Posts from "./components/Posts";
import Developers from "./components/Developers";
import Dashboard from "./page/Dashboard";
import CreateProfile from "./components/CreateProfile";
import ProtectedRoute from "./router/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="/developers" element={<Developers />} />
        <Route path="/createProfile" element={<CreateProfile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/posts" element={<Posts />} />
      </Route>
        <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
