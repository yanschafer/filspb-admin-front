export default class DocumentsUpdateDto {
    constructor(
        public image: string | null = null,
        public shortDescription: string | null = null,
        public description: string | null = null,
        public link: string | null = null,
        public buttonText: string | null = null,
        public visible: boolean | null = null,
        public position: number | null = null
    ) {}
}