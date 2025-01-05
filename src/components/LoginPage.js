import React, { useState } from "react";
import axios from "axios";
import "../css/LoginPage.css";

const LoginPage = () => {
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");

    const loginSubmit = async (e) => {
        e.preventDefault();

        // 비밀번호 간단한 암호화 (Base64 인코딩, 실제 환경에서는 더 안전한 방식 사용 필요)
        const encryptedPassword = password;

        try {
            const response = await axios.post("/user/login", {
                userId,
                encryptedPassword
            });
            alert("로그인 성공!");
            console.log(response.data);
        } catch (error) {
            alert("로그인 실패. 아이디와 비밀번호를 확인하세요.");
            console.error("로그인 오류:", error);
        }
    }

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
                    <form onSubmit={loginSubmit}>
                        <label>Id</label>
                        <input type="email" placeholder="Id or Email Address"
                               value={userId}
                               onChange={(e) => setUserId(e.target.value)}
                               required />
                        <label>Password</label>
                        <input type="password" placeholder="********"
                               value={password}
                               onChange={(e) => setPassword(e.target.value)}
                               required />
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
