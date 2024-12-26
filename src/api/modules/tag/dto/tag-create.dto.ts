export default class TagCreateDto {
    constructor(
        public name: string,
        public visible: boolean,
        public position: number
    ) {}
}