import CreateDto from "./dto/vacancy-create.dto";
import ListDto from "./dto/vacancy-list.dto";
import UpdateDto from "./dto/vacancy-update.dto";
import Dto from "./dto/vacancy.dto";
import BaseModel from "../base.model";

export default class VacancyModel extends BaseModel<Dto, ListDto, CreateDto, UpdateDto> {
    constructor() {
        super('vacancy', {"name": "Название"}, [
            {item: "name", label: "Название", type: "text"},
            {item: "image", label: "Изображение", type: "image"},
            {item: "description", label: "Описание", type: "writer"},
        ])
    }
}