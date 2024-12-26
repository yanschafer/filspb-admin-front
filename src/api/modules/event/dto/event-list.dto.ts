export default class EventListDto {
    constructor(
        public id: number,
        public date: number,
        public name: string,
        public PlatformName: string,
        public HallName: string,
        public visible: boolean,
        public position: number
    ) {}
}