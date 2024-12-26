export default class NewsListDto {
    constructor(
        public id: number, 
        public date: number,
        public name: string,
        public visible: boolean,
        public position: number
    ) {}
}