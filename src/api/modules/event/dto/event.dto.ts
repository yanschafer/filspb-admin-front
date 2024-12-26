export default class EventDto {
    constructor(
        public id: number,
        public date: number,
        public name: string,
        public hallId: number,
        public eventId: number,
        public price: number,
        public soldOut: boolean,
        public purchaseLink: string,
        public visible: boolean,
        public position: number
    ) {}
}