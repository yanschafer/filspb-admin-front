import CreateDto from "./dto/event-second-create.dto";
import ListDto from "./dto/event-second-list.dto";
import UpdateDto from "./dto/event-second-update.dto";
import Dto from "./dto/event-second.dto";
import BaseModel from "../base.model";
import TagModel from "../tag/tag.model";

export default class EventSecondModel extends BaseModel<Dto, ListDto, CreateDto, UpdateDto> {
    constructor() {
        super('event/but/not/event',  {"name": "Название"}, [
            {item: "date", label: "Дата", type: "timestamp"},
            {item: "name", label: "Название", type: "text"},
            {item: "image", label: "Изображение", type: "image"},
            {item: "shortDescription", label: "Краткое описание", type: "long-text"},
            {item: "time", label: "Время", type: "text"},
            {item: "description", label: "Описание", type: "writer"},
            {item: "authors", label: "Авторы", type: "sequential"},
            {item: "tags", label: "Теги", type: "checkbox-multi", selectorModel: new TagModel()}
        ])
    }
}