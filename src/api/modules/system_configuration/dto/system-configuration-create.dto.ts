export default class SystemConfigurationCreateDto {
    constructor(
        public name: string,
        public email: string,
        public address: string,
        public city: string,
        public addressShort: string,
        public vk: string,
        public telegram: string,
        public soundCloud: string,
    ) {}
}