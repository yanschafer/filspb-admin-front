export default class HallListDto {
    constructor(
        public id: number, 
        public name: string,
        public visible: boolean,
        public position: number
    ) {}
}