export default class EventSecondDto {
    constructor(
        public id: number,
        public date: number,
        public name: string,
        public image: string,
        public shortDescription: string,
        public time: string,
        public description: string,
        public authors: string,
        public tags: number[],
        public visible: boolean,
        public position: number
    ) {}
}