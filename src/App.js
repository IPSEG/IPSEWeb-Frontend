// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Traffic from './components/Traffic';
import Stock from './components/Stock';
import Weather from './components/Weather';
import './css/App.css';

const App = () => {
    return (
        <Router>
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
        </Router>
    );
};

export default App;
