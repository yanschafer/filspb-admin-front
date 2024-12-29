export default class DocumentsListDto {
    constructor(
        public id: number,
        public image: string,
        public visible: boolean,
        public position: number
    ) {}
}