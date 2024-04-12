import Button from "./utils/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const fetchId = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/v1/home", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        setUser(res.data);
      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    fetchId();
  }, []);

  return (
    <div className="bg-white border shadow-md p-5 rounded">
      <h1 className="text-xl font-medium">User Dashboard</h1>
      {user && (
        <div>
          <p className="text-gray-600">Welcome {user.name}</p>
          <p className="text-gray-600">email {user.email}</p>
          <p className="text-gray-600">
            joined {new Date(user.createdAt).toLocaleDateString()}
          </p>
        </div>
      )}
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
};

export default Dashboard;
