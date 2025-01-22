import SeasonEventItemDto from "./season-event-item.dto";

export default class SeasonEventDto {
    constructor(
        public id: number,
        public name: string,
        public image: string,
        public shortDescription: string,
        public description: string,
        public purchaseLink: string,
        public price: string,
        public isActive: boolean,
        public events: SeasonEventItemDto[],
        public position: number,
        public visible: boolean,
    ) {}
}