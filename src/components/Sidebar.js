// src/components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../Sidebar.css';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <h2>Menu</h2>
            <ul>
                <li><Link to="/Traffic">Traffic</Link></li>
                <li><Link to="/Stock">Stock</Link></li>
                <li><Link to="/Weather">Weather</Link></li>
            </ul>
        </div>
    );
};

export default Sidebar;
