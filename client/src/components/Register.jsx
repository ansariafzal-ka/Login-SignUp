import { useState } from "react";
import Button from "./utils/Button";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isError, setError] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/v1/register", {
        name: name,
        email: email,
        password: password,
      });

      console.log(res);

      if (res.status === 201) {
        navigate("/login");
      }
    } catch (error) {
      setError(true);
    }
  };

  return (
    <div className="bg-white w-[400px] p-5 flex flex-col justify-center items-center rounded border shadow-md">
      <h1 className="text-2xl font-medium mb-4">Register</h1>
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col justify-start items-start gap-y-3"
      >
        <label htmlFor="name" className="text-gray-500 font-medium">
          name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="enter name"
          className="w-full px-3 py-1 border rounded outline-none focus:ring-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label htmlFor="email" className="text-gray-500 font-medium">
          email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="enter email"
          className="w-full px-3 py-1 border rounded outline-none focus:ring-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password" className="text-gray-500 font-medium">
          password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="enter password"
          className="w-full px-3 py-1 mb-2 border rounded outline-none focus:ring-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {isError && (
          <div>
            <p className="text-red-500">User already exists</p>
          </div>
        )}
        <Button type="submit">register</Button>
      </form>
      <p className="mt-4 text-gray-500">
        Already have an account?
        <Link to="/login" className="ml-1 text-blue-600 underline">
          login
        </Link>
      </p>
    </div>
  );
};

export default Register;
