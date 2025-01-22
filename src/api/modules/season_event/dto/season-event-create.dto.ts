export default class SeasonEventCreateDto {
    constructor(
        public name: string,
        public image: string,
        public shortDescription: string,
        public description: string,
        public purchaseLink: string,
        public price: string,
        public isActive: boolean,
        public events: number[],
        public position: number,
        public visible: boolean,
    ) {}
}