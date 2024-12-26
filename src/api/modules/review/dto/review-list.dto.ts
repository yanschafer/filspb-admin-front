export default class ReviewListDto {
    constructor(
        public id: number,
        public date: number,
        public EventName: string,
        public name: string,
        public visible: boolean,
        public position: number
    ) {}
}