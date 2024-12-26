export default class PlatformDto {
    constructor(
        public id: number,
        public name: string,
        public adress: string,
        public visible: boolean,
        public position: number
    ) {}
}