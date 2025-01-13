import React, { useState, useEffect } from 'react';
import '../../css/SignUp.css';
import axios from "axios";
import {encryptPassword} from "../utils/RsaService";
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [formData, setFormData] = useState({
        userId: '',
        userName: '',
        userEmail: '',
        password: ''
    });

    const navigate = useNavigate();

    useEffect(() => {
        document.body.classList.add('signup-body');
        return () => {
            document.body.classList.remove('signup-body');
        };
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const signupSubmit = async (e) => {
        e.preventDefault();

        try {
            const rsaResponse = await axios.get("/rsa");
            const { modulus, exponent, randomString } = rsaResponse.data;
            const encryptedPassword = encryptPassword(formData.password, modulus, exponent);

            await axios.post("/user/join", {
                userId: formData.userId,
                userName: formData.userName,
                userEmail: formData.userEmail,
                encryptedPassword,
                randomString
            });
            alert("회원가입 성공! 생성한 계정 정보로 로그인 해주세요.");
            navigate('/');
        } catch (error) {
            alert('회원가입 실패');
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-form">
                <h2>Sign Up</h2>
                <form onSubmit={signupSubmit}>
                    <label>User ID</label>
                    <input
                        type="text"
                        name="userId"
                        value={formData.userId}
                        onChange={handleChange}
                        required
                    />

                    <label>User Name</label>
                    <input
                        type="text"
                        name="userName"
                        value={formData.userName}
                        onChange={handleChange}
                        required
                    />

                    <label>Email</label>
                    <input
                        type="email"
                        name="userEmail"
                        value={formData.userEmail}
                        onChange={handleChange}
                        required
                    />

                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    <button type="submit">Create Account</button>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
