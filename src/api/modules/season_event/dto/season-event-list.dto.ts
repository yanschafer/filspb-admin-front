export default class SeasonEventListDto {
    constructor(
        public id: number,
        public name: string,
        public isActive: boolean,
        public visible: boolean,
        public position: number
    ) {}
}