import React from "react";
import "../css/LoginPage.css";

const LoginPage = () => {
    return (
        <div className="login-container">
            <div className="login-left">
                <img
                    src="/img/loginpage.jpg" // 배경 이미지 대체 URL
                    alt="Background"
                    className="login-image"
                />
            </div>
            <div className="login-right">
                <div className="login-box">
                    <h1 className="login-title">Login</h1>
                    <p className="login-subtitle">
                        Login with the data you entered during your registration.
                    </p>
                    <form>
                        <label>Email</label>
                        <input type="email" placeholder="john.doe@gmail.com" required />
                        <label>Password</label>
                        <input type="password" placeholder="********" required />
                        <button type="submit" className="login-button">
                            Log in
                        </button>
                        <p className="forgot-password">Did you forget your password?</p>
                    </form>
                    <div className="signup-section">
                        <h2>Sign up</h2>
                        <p>Login with the data you entered during your registration.</p>
                        <button className="signup-button">Create account</button>
                    </div>
                </div>
                <footer className="login-footer">
                    <span>Cookies</span> | <span>Legal policy</span> | <span>Copyright 2021</span>
                </footer>
            </div>
        </div>
    );
};

export default LoginPage;
