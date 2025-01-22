export default class SeasonEventUpdateDto {
    constructor(
        public name: string | null,
        public image: string | null,
        public shortDescription: string | null,
        public description: string | null,
        public purchaseLink: string | null,
        public price: string | null,
        public isActive: boolean | null,
        public events: number[]  | null,
        public position: number | null,
        public visible: boolean | null,
    ) {}
}