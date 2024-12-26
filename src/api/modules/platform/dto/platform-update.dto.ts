export default class PlatformUpdateDto {
    constructor(
        public name: string | null = null,
        public adress: string | null = null,
        public visible: boolean | null = null,
        public position: number | null = null
    ) {}
}