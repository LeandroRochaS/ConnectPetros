import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Search from "./pages/Search";
import ContractsPage from "./pages/Home/Contracts";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Contract from "./pages/Home/Contract";
import Notices from "./pages/Notices";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/" index element={<ContractsPage />} />
          <Route path="/contract/:id" element={<Contract />} />
          <Route path="/search/:id" element={<Search />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/notices" element={<Notices />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
