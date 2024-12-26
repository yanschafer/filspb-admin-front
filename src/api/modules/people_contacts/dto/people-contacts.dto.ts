export default class PeopleContactsDto {
    constructor(
        public id: number, 
        public surname: string,
        public io: string,
        public email: string,
        public photo: string,
        public workPosition: string,
        public visible: boolean,
        public position: number
    ) {}
}