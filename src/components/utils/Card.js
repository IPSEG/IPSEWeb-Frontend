import React from 'react';
import '../../css/Card.css';
// 카드 컴포넌트
const Card = ({ id, content }) => {
    return (
        <div className="card">
            <h3>Card {id}</h3>
            <p>{content}</p>
        </div>
    );
};

export default Card;
