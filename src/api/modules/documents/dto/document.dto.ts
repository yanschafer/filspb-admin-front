export default class DocumentsDto {
    constructor(
        public id: number,
        public name: string,
        public doc: string,
        public visible: boolean,
        public position: number
    ) {}
}