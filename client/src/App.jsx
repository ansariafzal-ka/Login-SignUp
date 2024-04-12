import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import Dashboard from "./components/Dashboard";
import Register from "./components/Register";
import Login from "./components/Login";

const App = () => {
  return (
    <main className="w-full h-screen bg-gray-100 flex justify-center items-center">
      <Router>
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </main>
  );
};

export default App;
