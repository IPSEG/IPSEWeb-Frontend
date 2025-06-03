// @ts-ignore
import React, {useEffect, useState} from 'react';
// @ts-ignore
import {
    AddCardBox,
    CardBox, CardGroupTitle,
    DashBoardDescription,
    DashBoardTitle,
    DashBoardWrapper,
    Emoji, RightArrow,
    TextGroup
} from "../../../css/dashboard/DashBoard.styles.ts";
// @ts-ignore
import {ICardGroup, ICardItem} from "../../../type/dashboard/DashBoard.ts";
// @ts-ignore
import {fetchCardGroupList} from "../../../api/dashboard/DashBoardApi.ts";

const getEmoji = (type: ICardItem['cardType']) => {
    return type === 'BUS' ? '🚌' : '🚇';
};

const cardGroups: ICardGroup[] = [
    {
        id: 1,
        name: '출근용',
        cards: [
            {
                id: 1,
                cardType: 'BUS',
                name: '신덕1리 정류장'
            },
            {
                id: 2,
                cardType: 'SUBWAY',
                name: '강남역'
            },
        ]
    },
    {
        id: 2,
        name: '퇴근용',
        cards: [
            {
                id: 3,
                cardType: 'BUS',
                name: '판교테크노밸리',
            }
        ]
    }
]


function DashBoard() {

    const [cardGroups, setCardGroups] = useState<ICardGroup[]>([]);

    useEffect(() => {
        fetchCardGroupList().then((data) =>{
            setCardGroups(data);
        });
    }, []);

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
                                <Emoji>{getEmoji(card.cardType)}</Emoji>
                                <div>
                                    <DashBoardTitle>{card.name}</DashBoardTitle>
                                    <DashBoardDescription>{card.cardType === 'BUS' ? '버스 카드' : '지하철 카드 '}</DashBoardDescription>
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