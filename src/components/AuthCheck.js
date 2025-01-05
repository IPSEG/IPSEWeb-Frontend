import React from 'react';
import { Navigate } from 'react-router-dom';

const AuthCheck = ({ children }) => {
    const token = sessionStorage.getItem('token'); // 로컬스토리지에서 토큰을 가져옵니다.

    if (!token) {
        // 토큰이 없을 경우 로그인 페이지로 리디렉트
        return <Navigate to="/" replace />;
    }

    // 토큰이 있을 경우 해당 컴포넌트를 렌더링
    return children;
};

export default AuthCheck;
