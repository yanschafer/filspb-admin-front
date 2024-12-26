export default class ReviewUpdateDto {
    constructor(
        public date: number | null = null,
        public name: string | null = null,
        public review: string | null = null,
        public eventId: number | null = null,
        public doc: string | null = null,
        public visible: boolean | null = null,
        public position: number | null = null
    ) {}
}