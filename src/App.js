import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/pages/Sidebar';
import Traffic from './components/pages/Traffic';
import Stock from './components/pages/Stock';
import Weather from './components/pages/Weather';
import LoginPage from './components/pages/LoginPage';
import AuthCheck from './components/utils/AuthCheck';
import SignUp from './components/pages/SignUp';
import './css/App.css';
import BusStop from "./components/pages/bus/BusStop.tsx";
import BusArrival from "./components/pages/bus/BusArrival.tsx";
import DashBoard from "./components/pages/dashboard/DashBoard.tsx";

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
                                        <Route path="/busstop" element={<BusStop />}/>
                                        <Route path="/busstop/:cityCode/:busStopId"  element={<BusArrival/>}/>
                                        <Route path="/dashboard"  element={<DashBoard/>}/>
                                    </Routes>
                                </div>
                            </div>
                        </AuthCheck>
                    }
                />
                {/*<Route path="/Traffic" element={<Traffic />} />*/}
                {/*<Route path="/Stock" element={<Stock />} />*/}
                {/*<Route path="/Weather" element={<Weather />} />*/}
                {/*<Route path="/busstop" element={<BusStop />}/>*/}
                {/*<Route path="/busstop/:cityCode/:busStopId"  element={<BusArrival/>}/>*/}
                {/*<Route path="/dashboard" element={<DashBoard />}/>*/}
            </Routes>
        </Router>
    );
};

export default App;
