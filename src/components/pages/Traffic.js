import React, { useState } from 'react';
import Card from '../utils/Card';
import '../../css/Traffic.css';

const Traffic = () => {
    const [cards, setCards] = useState([]); // cards 상태를 빈 배열로 초기화
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리
    const [inputValue, setInputValue] = useState(''); // 입력값 상태 관리

    // 카드 추가 핸들러
    const addCard = () => {
        const newCard = {
            id: cards.length + 1,
            content: inputValue
        };
        setCards([...cards, newCard]);
        setIsModalOpen(false); // 모달 닫기
        setInputValue(''); // 입력값 초기화
    };

    return (
        <div className={`container ${isModalOpen ? 'modal-open' : ''}`}>
            <h2>카드 추가</h2>
            <button onClick={() => setIsModalOpen(true)} className="button add-button">+</button>
            <div className="cardContainer">
                {cards.map((card) => (
                    <Card key={card.id} id={card.id} content={card.content} className="card-item" />
                ))}
            </div>

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>새 카드 추가</h3>
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="카드 내용을 입력하세요"
                        />
                        <div className="modal-buttons">
                            <button onClick={addCard} className="button confirm">확인</button>
                            <button onClick={() => setIsModalOpen(false)} className="button cancel">취소</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Traffic;