
export interface BaseCardItem {
    cardId: number;
    cardName: string;
    userId: string;
    cardType : 'BUS' | 'SUBWAY';
}

export interface BusCardItem extends BaseCardItem {
    cardType: 'BUS';
    busStopName: string;
    detailCity: string | null;
    city: string | null;
    cityCode: string;
    busStopId: string;
}

export interface SubwayCardItem extends BaseCardItem {
    cardType : 'SUBWAY';
    stationName: string;
}

export type CardItem = BusCardItem | SubwayCardItem;




export interface ICardGroup {
    id: number;
    name: string;
    cards: CardItem[];
}