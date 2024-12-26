export default class NewsDto {
    constructor(
        public id: number, 
        public date: number,
        public name: string,
        public image: string,
        public shortDescription: string,
        public description: string,
        public visible: boolean,
        public position: number
    ) {}
}