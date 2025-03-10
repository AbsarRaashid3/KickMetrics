
import React, { useState, useEffect } from "react";
import { validateEmail, validatePassword, validateUsername } from "../FormValidation";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import '../assets/styles/authScreen.css';
import { useLoginMutation } from '../redux/slices/usersApiSlice';
import { setCredentials } from "../redux/slices/authSlice";
import { useRegisterMutation } from '../redux/slices/usersApiSlice';
/*Use useDispatch to dispatch actions like login or logout into slice.
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
    const [login, { isLoading }] = useLoginMutation();
    const { userInfo } = useSelector((state) => state.auth);
    const { search } = useLocation();
    const [register] = useRegisterMutation();

    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/dashboard'; 

    useEffect(() => {  //if user info is already in redux store and user tries to re-login, redirect to home page
        if (userInfo) {   
            // Prevent overriding if user is already on AdminPanel
            if (userInfo.isAdmin && window.location.pathname !== "/AdminPanel") {
                navigate('/AdminPanel');
            } else if (!userInfo.isAdmin && window.location.pathname !== redirect) {
                navigate(redirect);
            }
        }

    }, [userInfo, redirect, navigate]);

    const SignInHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await login({ email, password }).unwrap();
            console.log(res);
            dispatch(setCredentials({ ...res, }));
            if (res.isAdmin) {
                navigate('/AdminPanel');
            } else {
                navigate(redirect);
            }
        } catch (error) {
            console.log(error);
            setError(error?.data?.message || error.error);
        }

    };

    const SignUpHandler = async (e) => {
        e.preventDefault();
        const emailError = validateEmail(email); if (emailError) { setError(emailError); return; }
        const passwordError = validatePassword(password); if (passwordError) { setError(passwordError); return; }
        const userNameError = validateUsername(username); if (userNameError) { setError(userNameError); return; }

        try {
            const res = await register({name:username, email, password}).unwrap();
            dispatch(setCredentials({ ...res, }));
            navigate(redirect);
        } catch (error) {
            console.log(error);
            setError(error?.data?.message || error.error);
        }
    };


    return (
        <div className="authForm-container">

            <div className={`signup-container ${!signIn ? "active" : ""}`}>

                <form id="SignUp" className="form" onSubmit={SignUpHandler}>
                    <h1 className="title">Create Account</h1>
                    <input
                        type="text"
                        className="input"
                        placeholder="Enter Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="email"
                        className="input"
                        placeholder="Enter Email"
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
                    <Link to="/reset-password" className="anchor">Forgot your password?</Link>
                    <button className="button" type="submit" disabled={isLoading} >
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



