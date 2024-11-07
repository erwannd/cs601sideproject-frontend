import './App.css'

import React, { useState, useEffect } from 'react';

import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './config/firebaseconfig';

import { Route, Routes } from 'react-router-dom';
import { NavBar } from "./components/NavBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from './pages/Profile';
import Register from "./pages/Register";
import ImageQuery from "./pages/ImageQuery";
import TextQuery from "./pages/TextQuery";
import UploadImage from"./pages/UploadImage";
import AIprompt from"./pages/AIprompt";

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
      console.error('Sign-out error', error);
    }
  };

  // I want the profile route that shows in the banner to be linked to the userid.
  // The userid can be obtained when the user login using firebase, so the profile 
  // option would only show up if the user is logged in.
  // But I also want the Profile component to be generic. So, if I am a user and 
  // I am logged in, I can view other users' profile, with some limitations. For example,
  // I wouldn't be able to see their email etc.
  // In the future I would like to extend this by enabling the logged in user to change their
  // profile picture and change their username, which they should not be able to if the user
  // is viewing someone else's profile. Does this mean I need to pass in userId or logged in
  // state in the Profile component? Can you explain how I can implement this?
  // I am very much a beginner in handling user login and, so if you find something wrong 
  // do mention it.

  return (
    <div className="App">
      <NavBar user={user} handleLogout={handleLogout}/>
      <div className='main-container'>
        <Routes>
          <Route path="/" element={<Home userId={user?.uid}/>} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setUser={setUser}/>} />
          {user ? (
            <>
              <Route path="/findbyimage" element={<ImageQuery />} />
              <Route path="/findbytext" element={<TextQuery />} />
              <Route path="/generateimage" element={<AIprompt />} />
              <Route path="/uploadimage" element={<UploadImage token={token}/>} />
              <Route path="/user/:id" element={<Profile token={token} userId={user?.uid} isLoggedIn={!!user} />} />
            </>
          ) : (
            <Route path="*" element={<p>Please log in to access these features.</p>} />
          )}
        </Routes>
      </div>
    </div>
  );
}

export default App;