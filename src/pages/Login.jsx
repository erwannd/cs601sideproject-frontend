// // Sign in with Google using Firebase Authentication
// const signInWithGoogle = () => {
//     const provider = new GoogleAuthProvider();
//     setPersistence(auth, browserSessionPersistence)
//         .then(() => {
//             return signInWithRedirect(auth, provider);
//         })
//         .catch((error) => {
//             // Handle Errors here.
//             console.error('Error during sign in: ', error);
//         });
// };
//
// // Sign out the current user
// const logOff = () => {
//     signOut(auth).then(() => {
//         // Sign-out successful.
//         console.log("User signed out");
//         // Reset user-related state
//         setUser(null);
//         setGoogleId('');
//     }).catch((error) => {
//         // An error happened.
//         console.error("Error signing out: ", error);
//     });
// };
//
// // Effect to handle Firebase authentication state change
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

import React, { useState } from 'react';
import { setPersistence, browserLocalPersistence, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebaseconfig.js';
import { useNavigate } from 'react-router-dom';

const Login = ({ setUser }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await setPersistence(auth, browserLocalPersistence);
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            setUser(userCredential.user);
            navigate('/');
        } catch (err) {
            setError('Invalid email or password');
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
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    value={password}
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
