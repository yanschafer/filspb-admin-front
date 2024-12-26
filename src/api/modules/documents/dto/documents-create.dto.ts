export default class DocumentsCreateDto {
    constructor(
        public doc: string,
        public adress: string,
        public visible: boolean,
        public position: number
    ) {}
}