// @ts-ignore
import React from 'react';
import {
    AddCardBox,
    CardBox, CardGroupTitle,
    DashBoardDescription,
    DashBoardTitle,
    DashBoardWrapper,
    Emoji, RightArrow,
    TextGroup
} from "../../../css/dashboard/DashBoard.styles.ts";
import {ICardGroup, ICardItem} from "../../../type/dashboard/DashBoard";

const getEmoji = (type: ICardItem['type']) => {
    return type === 'BUS' ? '🚌' : '🚇';
};

const cardGroups: ICardGroup[] = [
    {
        name: '출근용',
        cards: [
            {
                type: 'BUS',
                title: '신덕1리 정류장',
                description: '222번 버스 · 5분 후 도착',
            },
            {
                type: 'SUBWAY',
                title: '강남역',
                description: '2호선 · 1분 후 도착',
            },
        ]
    },
    {
        name: '퇴근용',
        cards: [
            {
                type: 'BUS',
                title: '판교테크노밸리',
                description: '1007번 · 5분 후 도착',
            }
        ]
    }
]


function DashBoard() {
    return (
        <DashBoardWrapper>
            {cardGroups.map((group) => (
                <div key={group.name}>
                    <CardGroupTitle>
                        <span>🔑</span>
                        {group.name}
                    </CardGroupTitle>
                    {group.cards.map( (card, idx) => (
                        <CardBox key={idx}>
                            <TextGroup>
                                <Emoji>{getEmoji(card.type)}</Emoji>
                                <div>
                                    <DashBoardTitle>{card.title}</DashBoardTitle>
                                    <DashBoardDescription>{card.description}</DashBoardDescription>
                                </div>
                            </TextGroup>
                            <RightArrow>{'>'}</RightArrow>
                        </CardBox>
                    ))}
                </div>
                ))}
            <AddCardBox>+ 카드 추가</AddCardBox>
        </DashBoardWrapper>
    );

}


export default DashBoard;