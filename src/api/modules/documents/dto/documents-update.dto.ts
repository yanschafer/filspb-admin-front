export default class DocumentsUpdateDto {
    constructor(
        public name: string | null = null,
        public doc: string | null = null,
        public visible: boolean | null = null,
        public position: number | null = null
    ) {}
}