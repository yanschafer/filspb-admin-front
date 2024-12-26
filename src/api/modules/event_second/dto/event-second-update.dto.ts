export default class EventSecondUpdateDto {
    constructor(
        public date: number | null = null,
        public name: string | null = null,
        public hallId: number | null = null,
        public price: number | null = null,
        public soldOut: boolean | null = null,
        public purchaseLink: string | null = null,
        public doc: string | null = null,
        public visible: boolean | null = null,
        public position: number | null = null
    ) {}
}