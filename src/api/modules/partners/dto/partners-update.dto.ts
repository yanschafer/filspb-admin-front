export default class PartnersUpdateDto {
    constructor(
        public name: string | null = null,
        public image: string | null = null,
        public visible: boolean | null = null,
        public position: number | null = null
    ) {}
}