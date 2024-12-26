export default class DepartmentContactsUpdateDto {
    constructor(
        public name: string | null = null,
        public phone: string | null = null, 
        public timeTable: string | null = null,
        public visible: boolean | null = null,
        public position: number | null = null
    ) {}
}