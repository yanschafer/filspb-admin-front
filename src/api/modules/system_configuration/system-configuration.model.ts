import CreateDto from "./dto/system-configuration-create.dto";
import ListDto from "./dto/system-configuration-list.dto";
import UpdateDto from "./dto/system-configuration-update.dto";
import Dto from "./dto/system-configuration.dto";
import BaseModel from "../base.model";

export default class SystemConfigurationModel extends BaseModel<Dto, ListDto, CreateDto, UpdateDto> {
    constructor() {
        super('people/contacts', [])
    }
}