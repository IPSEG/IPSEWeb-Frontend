import React, { useState } from 'react';
import Card from './Card';
import '../css/Traffic.css';

const Traffic = () => {
    const [cards, setCards] = useState([]); // cards 상태를 빈 배열로 초기화

    // 카드 추가 핸들러
    const addCard = () => {
        const newCard = {
            id: cards.length + 1,
            content: `This is card number ${cards.length + 1}`
        };
        setCards([...cards, newCard]);
    };

    return (
        <div className="container">
            <h2>카드 추가</h2>
            <button onClick={addCard} className="button">+</button>
            <div className="cardContainer">
                {cards.map((card) => (
                    <Card key={card.id} id={card.id} content={card.content} />
                ))}
            </div>
        </div>
    );
};

export default Traffic;
