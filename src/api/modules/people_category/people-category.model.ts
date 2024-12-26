import CreateDto from "./dto/people-category-create.dto";
import ListDto from "./dto/people-category-list.dto";
import UpdateDto from "./dto/people-category-update.dto";
import Dto from "./dto/people-category.dto";
import BaseModel from "../base.model";

export default class PeopleCategoryModel extends BaseModel<Dto, ListDto, CreateDto, UpdateDto> {
    constructor() {
        super('people/category', {"name": "Название"}, [
            {item: "name", label: "Время", type: "text"},
        ])
    }
}