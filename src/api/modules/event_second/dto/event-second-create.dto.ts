export default class EventSecondCreateDto {
    constructor(
        public date: number,
        public name: string,
        public hallId: number,
        public price: number,
        public soldOut: boolean,
        public purchaseLink: string,
        public visible: boolean,
        public position: number
    ) {}
}