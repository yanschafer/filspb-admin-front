export default class DocumentsCreateDto {
    constructor(
        public desktopImage: string,
        public mobileImage: string,
        public link: string,
        public buttonText: string,
        public visible: boolean,
        public position: number
    ) {}
}