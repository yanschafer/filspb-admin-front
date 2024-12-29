export default class DocumentsUpdateDto {
    constructor(
        public image: string | null = null,
        public visible: boolean | null = null,
        public position: number | null = null
    ) {}
}