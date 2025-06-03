
export interface ICardItem {
    id: number;
    name : string;
    cardType: 'BUS' | 'SUBWAY'
}

export interface ICardGroup {
    id: number;
    name: string;
    cards: ICardItem[];
}