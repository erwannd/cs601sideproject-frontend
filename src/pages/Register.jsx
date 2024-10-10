import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    // State variables to store user input
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate input
        if (!username || !email || !password) {
            setError("All fields are required.");
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/auth/register', {
                username: username,
                email: email,
                password: password
            });

            const data = response.data; // Axios automatically parses JSON

            if (data.success) {
                // TODO: Maybe redirect user after successful registration?
                console.log('Registration successful', data);
                setSuccessMessage('Registration successful! Redirecting to login...');
                setTimeout(() => navigate('/login'), 2000);
            } else {
                setError(data.message || 'Registration failed');
            }

        } catch (err) {
            console.log(err);
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError('Something went wrong. Please try again later.');
            }
        }
    };

    return (
        <div>
            <h2>Register</h2>
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => {
                        setUsername(e.target.value)
                        setError(null)
                    }}
                    placeholder="Username"
                    required
                />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value)
                        setError(null)
                    }}
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value)
                        setError(null)
                    }}
                    placeholder="Password"
                    required
                />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;