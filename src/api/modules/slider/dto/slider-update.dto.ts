export default class DocumentsUpdateDto {
    constructor(
        public desktopImage: string | null = null,
        public mobileImage: string | null = null,
        public link: string | null = null,
        public buttonText: string | null = null,
        public visible: boolean | null = null,
        public position: number | null = null
    ) {}
}