
export interface ICardItem {
    type: 'BUS' | 'SUBWAY'
    title: string;
    description: string;
}

export interface ICardGroup {
    name: string;
    cards: ICardItem[];
}