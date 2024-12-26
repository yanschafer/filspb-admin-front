export default class PlatformListDto {
    constructor(
        public id: number,
        public name: string,
        public adress: string,
        public visible: boolean,
        public position: number
    ) {}
}