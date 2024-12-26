export default class ReviewDto {
    constructor(
        public id: number,
        public date: number,
        public name: string,
        public review: string,
        public eventId: number,
        public visible: boolean,
        public position: number
    ) {}
}