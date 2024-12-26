export default class HallDto {
    constructor(
        public id: number, 
        public name: string,
        public platform: number,
        public visible: boolean,
        public position: number
    ) {}
}