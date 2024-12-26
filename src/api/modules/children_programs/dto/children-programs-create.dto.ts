export default class ChildrenProgramsCreateDto {
    constructor(
        public name: string,
        public image: string, 
        public description: string,
        public visible: boolean,
        public position: number
    ) {}
}