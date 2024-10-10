import './App.css'

import React, { useState, useEffect } from 'react';

import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './config/firebaseconfig';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { NavBar } from "./components/NavBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ImageQuery from "./pages/ImageQuery";
import TextQuery from "./pages/TextQuery";
import UploadImage from './pages/UploadImage';


function App() {
    const [user, setUser] = useState(null); // Logged-in user
    const [token, setToken] = useState(null); // Token for current user

    // useEffect(() => {
    //     const unsubscribe = auth.onAuthStateChanged(firebaseUser => {
    //         if (firebaseUser) {
    //             // User is signed in.
    //             setUser(firebaseUser);
    //             setGoogleId(firebaseUser.uid);
    //             fetchInGameName(firebaseUser.uid);
    //         } else {
    //             // No user is signed in.
    //             setUser(null);
    //             setGoogleId('');
    //             setInGameName('');
    //         }
    //     });
    //
    //     return () => unsubscribe();
    // }, []);

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

    return (
        <div className="App">
            <NavBar user={user} handleLogout={handleLogout}/>
            <div className='main-container'>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login setUser={setUser}/>} />
                    {user ? (
                        <>
                            <Route path="/findbyimage" element={<ImageQuery />} />
                            <Route path="/findbytext" element={<TextQuery />} />
                            <Route path="/uploadimage" element={<UploadImage token={token}/>} />
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