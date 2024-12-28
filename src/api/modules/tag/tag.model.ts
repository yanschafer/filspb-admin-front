import CreateDto from "./dto/tag-create.dto";
import ListDto from "./dto/tag-list.dto";
import UpdateDto from "./dto/tag-update.dto";
import Dto from "./dto/tag.dto";
import BaseModel from "../base.model";

export default class TagModel extends BaseModel<Dto, ListDto, CreateDto, UpdateDto> {
    constructor() {
        super('tag', {"name": "Название"}, [
            {item: "name", label: "Тэг", type: "text"},
        ])
    }
}