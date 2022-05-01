import { useEffect } from "react";
import './App.css';
import { ToastContainer } from "react-toastify";
import {BrowserRouter, Routes, Route} from "react-router-dom"
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Header from './components/Header';
import { useDispatch } from "react-redux";
import {setUser} from "./redux/features/authSlice"
import AddEditWorker from "./pages/AddEditWorker";
import Dashboard from "./pages/Dashboard";

function App() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  useEffect(() => {
    dispatch(setUser(user))
  }, [])

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/addWorker" element={<AddEditWorker />} />
          <Route path="/editWorker/:id" element={<AddEditWorker />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
