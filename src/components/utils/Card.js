import React from 'react';
import '../../css/Card.css';

const Card = ({ stationName, arrivals }) => {
    return (
        <div className="card">
            <h2>{stationName}역</h2>
            {arrivals.map((arrival, index) => (
                <div key={index} className="arrival-item">
                    <h4>{arrival.subwayName} ({arrival.trainLineNm})</h4>
                    <p>남은 시간: {arrival.barvlDt}초</p>
                    <p>안내 메시지: {arrival.arvlMsg2}</p>
                    {index !== arrivals.length - 1 && <br />}
                </div>
            ))}
        </div>
    );
};

export default Card;
