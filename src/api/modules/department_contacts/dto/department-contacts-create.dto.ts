export default class DepartmentContactsCreateDto {
    constructor(
        public name: string,
        public phone: string, 
        public timeTable: string,
        public visible: boolean,
        public position: number
    ) {}
}