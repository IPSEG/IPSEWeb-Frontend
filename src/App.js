import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Traffic from './components/Traffic';
import Stock from './components/Stock';
import Weather from './components/Weather';
import LoginPage from './components/LoginPage';
import AuthCheck from './components/AuthCheck'; // HOC 불러오기
import './css/App.css';

const App = () => {
    return (
        <Router>
            <Routes>
                {/* 로그인 페이지는 항상 접근 가능 */}
                <Route path="/" element={<LoginPage />} />

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
