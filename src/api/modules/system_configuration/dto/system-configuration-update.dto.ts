export default class SystemConfigurationUpdateDto {
    constructor(
        public name: string | null = null,
        public email: string | null = null,
        public address: string | null = null,
        public city: string | null = null,
        public addressShort: string | null = null,
        public vk: string | null = null,
        public telegram: string | null = null,
        public soundCloud: string | null = null,
    ) {}
}