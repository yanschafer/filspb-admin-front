export default class NewsCreateDto {
    constructor(
        public date: number,
        public name: string,
        public image: string,
        public shortDescription: string,
        public description: string,
        public visible: boolean,
        public position: number
    ) {}
}