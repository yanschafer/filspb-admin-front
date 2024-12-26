export default class HallUpdateDto {
    constructor(
        public name: string | null = null,
        public platform: number | null = null,
        public visible: boolean | null = null,
        public position: number | null = null
    ) {}
}