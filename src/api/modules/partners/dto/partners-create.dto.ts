export default class PartnersCreateDto {
    constructor(
        public name: string,
        public image: string,
        public visible: boolean,
        public position: number
    ) {}
}