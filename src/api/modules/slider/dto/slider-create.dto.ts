export default class DocumentsCreateDto {
    constructor(
        public image: string,
        public visible: boolean,
        public position: number
    ) {}
}