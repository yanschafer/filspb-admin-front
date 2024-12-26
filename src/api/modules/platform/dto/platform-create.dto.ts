export default class PlatformCreateDto {
    constructor(
        public name: string,
        public adress: string,
        public visible: boolean,
        public position: number
    ) {}
}