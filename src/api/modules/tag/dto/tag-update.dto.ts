export default class TagUpdateDto {
    constructor(
        public name: string | null = null,
        public visible: boolean | null = null,
        public position: number | null = null
    ) {}
}