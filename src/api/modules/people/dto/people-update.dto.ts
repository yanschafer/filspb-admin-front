export default class PeopleUpdateDto {
    constructor(
        public name: string | null = null,
        public photo: string | null = null,
        public workPosition: string | null = null,
        public category: string | null = null,
        public categoryBoss: boolean | null = null,
        public visible: boolean | null = null,
        public position: number | null = null
    ) {}
}