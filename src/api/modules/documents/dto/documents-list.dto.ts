export default class DocumentsListDto {
    constructor(
        public id: number,
        public name: string,
        public visible: boolean,
        public position: number
    ) {}
}