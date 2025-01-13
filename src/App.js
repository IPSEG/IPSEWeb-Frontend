import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/pages/Sidebar';
import Traffic from './components/pages/Traffic';
import Stock from './components/pages/Stock';
import Weather from './components/pages/Weather';
import LoginPage from './components/pages/LoginPage';
import SignUp from './components/pages/SignUp';
import AuthCheck from './components/utils/AuthCheck'; // HOC 불러오기
import './css/App.css';

const App = () => {
    return (
        <Router>
            <Routes>
                {/* 로그인 페이지는 항상 접근 가능 */}
                <Route path="/" element={<LoginPage />} />

                <Route path="/SignUp" element={<SignUp />} />

                {/* 로그인 후 접근 가능 */}
                <Route
                    path="/main"
                    element={
                        <AuthCheck>
                            <div className="app">
                                <Sidebar />
                                <div className="content">
                                    <Routes>
                                        <Route path="/Traffic" element={<Traffic />} />
                                        <Route path="/Stock" element={<Stock />} />
                                        <Route path="/Weather" element={<Weather />} />
                                    </Routes>
                                </div>
                            </div>
                        </AuthCheck>
                    }
                />
            </Routes>
        </Router>
    );
};

export default App;
