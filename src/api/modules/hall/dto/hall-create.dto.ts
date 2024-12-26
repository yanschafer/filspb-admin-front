export default class HallCreateDto {
    constructor(
        public name: string,
        public platform: number,
        public visible: boolean,
        public position: number
    ) {}
}