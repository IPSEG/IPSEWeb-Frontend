// src/components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/Sidebar.css';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <h2>Menu</h2>
            <ul>
                <li>
                    <Link to="/src/components/pages/Traffic" className="sidebar-link">Traffic</Link>
                </li>
                <li>
                    <Link to="/src/components/pages/Stock" className="sidebar-link">Stock</Link>
                </li>
                <li>
                    <Link to="/src/components/pages/Weather" className="sidebar-link">Weather</Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;