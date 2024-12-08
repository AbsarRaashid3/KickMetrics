import React, { useState, useEffect } from "react";
import { validateEmail, validatePassword, validateUsername } from "../FormValidations";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/slices/authSlice';
import '../assets/styles/authScreen.css';

/*Use useDispatch to dispatch actions like login or logout.
Use useSelector to read from the Redux store.
useState triggers re-rendering. it is used to store/manage  the dynamic data in component */

function AuthScreen() {
    const [signIn, toggle] = useState(true);       // Initially, SignIn page is active
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    const SignInHandler = (e) => {
        e.preventDefault();
        // Hard-code the email and password for testing
        const email = "laiba123@gmail.com";  // Replace this with the email you want to test
        const password = "lz@12345";  // Replace this with the password you want to test

        const emailError = validateEmail(email); if (emailError) { setError(emailError); return; }
        const passwordError = validatePassword(password); if (passwordError) { setError(passwordError); return; }
        const users = JSON.parse(localStorage.getItem('users')) || {};

        if (!users[email]) { setError("No account found with this email."); return; }
        if (users[email].password !== password) { setError("Invalid password."); return; }
        const token = "jwt-token"; 

        users[email] = {
            ...users[email],  // Preserve the previous data (in case it exists)
            email: email,
            password: password,
            username: username,
            authToken: token
          };
        // Store the updated users collection back in localStorage
        localStorage.setItem('users', JSON.stringify(users));

        dispatch(login({ user: users[email] }));
        setError('');
    };

    const SignUpHandler = (e) => {
        e.preventDefault();
        const emailError = validateEmail(email); if (emailError) { setError(emailError); return; }
        const passwordError = validatePassword(password); if (passwordError) { setError(passwordError); return; }
        const userNameError = validateUsername(username); if (userNameError) { setError(userNameError); return; }

        const users = JSON.parse(localStorage.getItem('users')) || {};
        if (users[email]) { setError("User already exists with this email."); return; }

        setError('');
        const token = "simulated-jwt-token";          // In a real app, this would come from the backend and is stored in HTTP-only cookies that is not possible without backend
        setTimeout(() => {                   // Use a timeout to ensure the state is updated before triggering the alert

        users[email] = {
            ...users[email],  // Preserve the previous data (in case it exists)
            email: email,
            password: password,
            username: username,
            authToken: token
          };
            localStorage.setItem('users', JSON.stringify(users));

            dispatch(login({ user: users[email] }));
        }, 100);
    };

    // Redirect to dashboard if authenticated
    React.useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard'); // Redirect to Dashboard
        }
    }, [isAuthenticated, navigate]);


    return (
        <div className="authForm-container">
            <div className={`signup-container ${!signIn ? "active" : ""}`}>
                <form id="SignUp" className="form" onSubmit={SignUpHandler}>
                    <h1 className="title">Create Account</h1>
                    <input
                        type="text"
                        className="input"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="email"
                        className="input"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        className="input"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className="button" type="submit" >
                        Sign Up
                    </button>
                    {error && <p className="error">{error}</p>}
                </form>
            </div>

            <div className={`signin-container ${signIn ? "" : "inactive"}`}>
                <form id="SignIn" className="form" onSubmit={SignInHandler}>
                    <h1 className="title">Sign in</h1>
                    <input
                        type="email"
                        className="input"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        className="input"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Link to="/forgot-password" className="anchor">Forgot your password?</Link>
                    <button className="button" type="submit" >
                        Sign In
                    </button>
                    {error && <p className="error">{error}</p>}
                </form>
            </div>

            <div className={`overlay-container ${signIn ? "" : "inactive"}`}>
                <div className={`overlay ${!signIn ? "active" : ""}`}>
                    {/* Left Overlay Panel */}
                    <div className={`overlay-panel left-overlay-panel ${signIn ? "active" : ""}`}>
                        <h1 className="title">Welcome Back!</h1>
                        <p className="paragraph">To keep connected with us, please login with your personal info</p>
                        <button className="ghost-button" onClick={() => toggle(true)}>
                            Sign In
                        </button>
                    </div>

                    {/* Right Overlay Panel */}
                    <div className={`overlay-panel right-overlay-panel ${!signIn ? "active" : ""}`}>
                        <h1 className="title">Hello, Friend!</h1>
                        <p className="paragraph">Enter your personal details and start your journey with us</p>
                        <button className="ghost-button" onClick={() => toggle(false)}>
                            Sign Up
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AuthScreen;



