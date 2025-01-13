import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import "../../css/LoginPage.css";
import {encryptPassword} from "../utils/RsaService";

const LoginPage = () => {
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); // 훅을 컴포넌트 최상단에 선언

    const loginSubmit = async (e) => {
        e.preventDefault();

        try {
            const rsaResponse = await axios.get("/rsa");
            const modulus = rsaResponse.data.modulus;
            const exponent = rsaResponse.data.exponent;
            const randomString = rsaResponse.data.randomString;
            const encryptedPassword = encryptPassword(password, modulus, exponent);

            const loginResponse = await axios.post("/user/login", {
                userId,
                encryptedPassword,
                randomString
            });
            sessionStorage.setItem("accessToken", loginResponse.data.accessToken);
            navigate('/main')
        } catch (error) {
            alert("로그인 실패. 아이디와 비밀번호를 확인하세요.");
            console.error("로그인 오류 : ", error);
        }
    }

    const signUp = () => {
        navigate('/SignUp');  // 클릭 시 페이지 이동
    };

    return (
        <div className="login-container">
            <div className="login-left">
                <img
                    src="/img/loginpage.jpg" // 배경 이미지 URL
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
                        <input type="id" placeholder="Id or Email Address"
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
                        <p className="forgot-password">비밀번호 찾기</p>
                    </form>
                    <div className="signup-section">
                        <h2>Sign up</h2>
                        <button className="signup-button" onClick={signUp}>Create account</button>
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
