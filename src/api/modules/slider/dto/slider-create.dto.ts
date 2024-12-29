export default class DocumentsCreateDto {
    constructor(
        public image: string,
        public shortDescription: string,
        public description: string,
        public link: string,
        public buttonText: string,
        public visible: boolean,
        public position: number
    ) {}
}