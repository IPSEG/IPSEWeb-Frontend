// src/components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Sidebar.css';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <h2>Menu</h2>
            <ul>
                <li>
                    <Link to="/Traffic" className="sidebar-link">Traffic</Link>
                </li>
                <li>
                    <Link to="/Stock" className="sidebar-link">Stock</Link>
                </li>
                <li>
                    <Link to="/Weather" className="sidebar-link">Weather</Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;