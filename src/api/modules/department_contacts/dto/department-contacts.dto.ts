export default class DepartmentContactsDto {
    constructor(
        public id: number, 
        public name: string,
        public phone: string, 
        public timeTable: string,
        public visible: boolean,
        public position: number
    ) {}
}