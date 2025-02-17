import React, { useState, useEffect } from 'react';
import { useAuth } from "../utils/AuthContext";
import axios from "axios";
import Card from '../utils/Card';
import '../../css/Traffic.css';

const Traffic = () => {
    const [cards, setCards] = useState([]); // cards 상태를 빈 배열로 초기화
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리
    const [inputValue, setInputValue] = useState(''); // 입력값 상태 관리
    const { id } = useAuth();

    // 최초 API 호출 (페이지 로드 시 한 번 실행)
    useEffect(() => {
        const fetchInitialData = async () => {
            try {


                const defaultStation = "서울"; // 기본 지하철역 설정
                const subwayResponse = await axios.get(`/api/traffic/card/v1?userId=user001`);
                const realtimeArrivalList = subwayResponse.data?.data?.realtimeArrivalList;

                if (!realtimeArrivalList || realtimeArrivalList.length === 0) {
                    console.warn("조회된 초기 지하철 정보가 없습니다.");
                    return;
                }

                // 기본 카드 추가
                const initialCard = {
                    id: 1, // 첫 번째 카드
                    stationName: defaultStation,
                    arrivals: realtimeArrivalList,
                };

                setCards([initialCard]);
            } catch (error) {
                console.error("초기 데이터 가져오기 오류:", error);
            }
        };

        fetchInitialData();
    }, []); // 빈 의존성 배열로 한 번만 실행
    // 카드 추가 핸들러
    const addCard = async (e) => {
        e.preventDefault();
        try {
            // API 호출
            const cardAddResponse = await axios.post("/api/traffic/card/v1/add",{
                userId: id,
                stationName: inputValue,
                cardType: "SUBWAY",
            });


            const subwayResponse = await axios.get("/api/traffic/subway-arrival/v1?name=" + inputValue);
            const realtimeArrivalList = subwayResponse.data?.data?.realtimeArrivalList;

            if (!realtimeArrivalList || realtimeArrivalList.length === 0) {
                alert("조회된 지하철 정보가 없습니다.");
                return;
            }

            // 새 카드 생성: 전체 리스트를 포함한 카드
            const newCard = {
                id: cards.length + 1, // 고유 ID
                stationName: inputValue,
                arrivals: realtimeArrivalList, // 전체 리스트 저장
            };

            // 기존 카드 배열에 새 카드 추가
            setCards([...cards, newCard]);
        } catch (error) {
            alert("카드 등록에 실패했습니다. 잠시 후 다시 시도해주세요.");
            console.error("카드 등록 오류: ", error);
        } finally {
            setIsModalOpen(false); // 모달 닫기
            setInputValue(''); // 입력값 초기화
        }
    };

    return (
        <div className={`container ${isModalOpen ? 'modal-open' : ''}`}>
            <h2>카드 추가</h2>
            <button onClick={() => setIsModalOpen(true)} className="button add-button">+</button>
            <div className="cardContainer">
                {cards.map((card) => (
                    <Card
                        key={card.id}
                        stationName = {card.stationName}
                        arrivals={card.arrivals} // 리스트를 카드에 전달
                        className="card-item"
                    />
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
                            placeholder="지하철 이름을 입력하세요"
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
