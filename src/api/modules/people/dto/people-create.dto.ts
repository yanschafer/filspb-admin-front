export default class PeopleCreateDto {
    constructor(
        public name: string,
        public photo: string,
        public workPosition: string,
        public category: string,
        public categoryBoss: boolean,
        public visible: boolean,
        public position: number
    ) {}
}