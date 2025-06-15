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
import {BusCardItem, ICardGroup, ICardItem, SubwayCardItem} from "../../../type/dashboard/DashBoard.ts";
// @ts-ignore
import {fetchCardGroupList} from "../../../api/dashboard/DashBoardApi.ts";

const getEmoji = (type: ICardItem['cardType']) => {
    return type === 'BUS' ? '🚌' : '🚇';
};

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
                    {group.cards.map( (card) => (
                        <CardBox key={card.cardId}>
                            <TextGroup>
                                <Emoji>{getEmoji(card.cardType)}</Emoji>
                                <div>
                                    <DashBoardTitle>{card.cardName}</DashBoardTitle>
                                    {card.cardType === 'BUS' ? (
                                     <>
                                         <DashBoardDescription>정류장: {(card as BusCardItem).busStopName}</DashBoardDescription>
                                         <DashBoardDescription>지역: {(card as BusCardItem).detailCity || '정보 없음'}</DashBoardDescription>
                                     </>
                                    ) : (
                                        <DashBoardDescription>지하철 역: {(card as SubwayCardItem).stationName}</DashBoardDescription>
                                    )}
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