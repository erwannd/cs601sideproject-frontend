import "./App.css";

import React, { useState, useEffect } from "react";

import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./config/firebaseconfig";

import { Route, Routes } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import ImageQuery from "./pages/ImageQuery";
import TextQuery from "./pages/TextQuery";
import UploadImage from "./pages/UploadImage";
import AIprompt from "./pages/AIprompt";

function App() {
  const [user, setUser] = useState(null); // Logged-in user
  const [token, setToken] = useState(null); // Token for current user

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const tkn = await user.getIdToken();
        setToken(tkn);
      } else {
        setUser(null);
        setToken(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Sign-out error", error);
    }
  };

  return (
    <div className="App">
      <NavBar user={user} handleLogout={handleLogout} />
      <div className="main-container">
        <Routes>
          <Route path="/" element={<Home userId={user?.uid} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          {user ? (
            <>
              <Route path="/findbyimage" element={<ImageQuery />} />
              <Route path="/findbytext" element={<TextQuery />} />
              <Route path="/generateimage" element={<AIprompt token={token}/>} />
              <Route
                path="/uploadimage"
                element={<UploadImage token={token} />}
              />
              <Route
                path="/user/:id"
                element={
                  <Profile
                    token={token}
                    userId={user?.uid}
                    isLoggedIn={!!user}
                  />
                }
              />
            </>
          ) : (
            <Route
              path="*"
              element={<p>Please log in to access these features.</p>}
            />
          )}
        </Routes>
      </div>
    </div>
  );
}

export default App;
