export default class VacancyDto {
    constructor(
        public id: number, 
        public name: string,
        public image: string,
        public description: string,
        public visible: boolean,
        public position: number
    ) {}
}