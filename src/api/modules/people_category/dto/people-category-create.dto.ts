export default class PeopleCategoryCreateDto {
    constructor(
        public name: string,
        public visible: boolean,
        public position: number
    ) {}
}