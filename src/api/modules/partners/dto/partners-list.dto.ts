export default class PartnersListDto {
    constructor(
        public id: number, 
        public name: string,
        public image: string,
        public visible: boolean,
        public position: number
    ) {}
}