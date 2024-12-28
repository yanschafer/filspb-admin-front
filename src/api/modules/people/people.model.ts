import CreateDto from "./dto/people-create.dto";
import ListDto from "./dto/people-list.dto";
import UpdateDto from "./dto/people-update.dto";
import Dto from "./dto/people.dto";
import BaseModel from "../base.model";
import PeopleCategoryModel from "../people_category/people-category.model";

export default class PeopleModel extends BaseModel<Dto, ListDto, CreateDto, UpdateDto> {
    constructor() {
        super('people',  {"name": "ФИО"}, [
            {item: "name", label: "ФИО", type: "text"},
            {item: "category", label: "Категория", type: "model-selector", selectorModel: new PeopleCategoryModel()},
            {item: "photo", label: "Фото", type: "image"},
            {item: "workPosition", label: "Должность", type: "text"},
            // {item: "categoryBoss", label: "Руководящая должность", type: "selector", selectorOptions: {"Да": true, "Нет": false}},
        ])
    }
}