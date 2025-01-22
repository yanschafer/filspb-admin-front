export default class DocumentsDto {
    constructor(
        public id: number,
        public desktopImage: string,
        public mobileImage: string,
        public link: string,
        public buttonText: string,
        public visible: boolean,
        public position: number
    ) {}
}