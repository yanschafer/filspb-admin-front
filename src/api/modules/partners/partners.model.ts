import CreateDto from "./dto/partners-create.dto";
import ListDto from "./dto/partners-list.dto";
import UpdateDto from "./dto/partners-update.dto";
import Dto from "./dto/partners.dto";
import BaseModel from "../base.model";

export default class PartnersModel extends BaseModel<Dto, ListDto, CreateDto, UpdateDto> {
    constructor() {
        super('partners',  {"name": "Название", "image": "Логотип"}, [
            {item: "name", label: "Время", type: "text"},
            {item: "image", label: "Время", type: "image"},
        ])
    }
}