import CreateDto from "./dto/platform-create.dto";
import ListDto from "./dto/platform-list.dto";
import UpdateDto from "./dto/platform-update.dto";
import Dto from "./dto/platform.dto";
import BaseModel from "../base.model";

export default class PlatfromModel extends BaseModel<Dto, ListDto, CreateDto, UpdateDto> {
    constructor() {
        super('platform', {"name": "Название", "address": "Адрес"}, [
            {item: "name", label: "Время", type: "text"},
            {item: "address", label: "Время", type: "text"},
        ])
    }
}