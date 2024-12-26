export default class PeopleContactsListDto {
    constructor(
        public id: number, 
        public surname: string,
        public visible: boolean,
        public position: number
    ) {}
}