export default class PeopleDto {
    constructor(
        public id: number, 
        public name: string,
        public photo: string,
        public workPosition: string,
        public category: string,
        public categoryBoss: boolean,
        public visible: boolean,
        public position: number
    ) {}
}