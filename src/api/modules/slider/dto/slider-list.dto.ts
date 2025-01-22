export default class DocumentsListDto {
    constructor(
        public id: number,
        public desktopImage: string,
        public buttonText: string,
        public visible: boolean,
        public position: number
    ) {}
}