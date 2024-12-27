export default class EventSecondUpdateDto {
    constructor(
        public date: number | null = null,
        public name: string | null = null,
        public image: string | null = null,
        public shortDescription: string | null = null,
        public time: string | null = null,
        public description: string | null = null,
        public authors: string | null = null,
        public tags: number[] | null = null,
        public visible: boolean | null = null,
        public position: number | null = null
    ) {}
}