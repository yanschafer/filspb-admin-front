export default class SystemConfigurationListDto {
    constructor(
        public id: number, 
        public name: string,
        public visible: boolean,
        public position: number
    ) {}
}