import CreateDto from "./dto/event-second-create.dto";
import ListDto from "./dto/event-second-list.dto";
import UpdateDto from "./dto/event-second-update.dto";
import Dto from "./dto/event-second.dto";
import BaseModel from "../base.model";

export default class EventSecondModel extends BaseModel<Dto, ListDto, CreateDto, UpdateDto> {
    constructor() {
        super('platform',  {"name": "Название"}, [
            {item: "date", label: "Дата", type: "text"},
            {item: "name", label: "Время", type: "text"},
            {item: "image", label: "Время", type: "image"},
            {item: "shortDescription", label: "Время", type: "long-text"},
            {item: "time", label: "Время", type: "long-text"},
            {item: "description", label: "Время", type: "writer"},
            {item: "authors", label: "Авторы", type: "sequential"}
        ])
    }
}