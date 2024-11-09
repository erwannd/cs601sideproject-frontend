import React, { useState } from "react";
import {
  setPersistence,
  browserLocalPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../config/firebaseconfig.js";
import { useNavigate } from "react-router-dom";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await setPersistence(auth, browserLocalPersistence);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
      navigate("/");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
          }}
          required
        />
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
            setError("");
          }}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
