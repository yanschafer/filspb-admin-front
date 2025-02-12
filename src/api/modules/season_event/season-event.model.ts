import CreateDto from "./dto/season-event-create.dto";
import ListDto from "./dto/season-event-list.dto";
import UpdateDto from "./dto/season-event-update.dto";
import Dto from "./dto/season-event.dto";
import BaseModel from "../base.model";
import EventSecondModel from "../event_second/event-second.model";

export default class SeasonEventModel extends BaseModel<Dto, ListDto, CreateDto, UpdateDto> {
    constructor() {
        super(
            'event/season', 
            {"name": "Название", "isActive": "Активно"},
            [
                {item: "name", label: "Название", type: "text"},
                {item: "image", label: "Изображение", type: "image"},
                {item: "shortDescription", label: "Краткое описание", type: "text"},
                {item: "description", label: "Описание", type: "writer"},
                {item: "price", label: "Цена", type: "text"},
                {item: "isActive", label: "Активен", type: "selector", selectorOptions: {"Да": true, "Нет": false}},
                {item: "events", label: "Мероприятия", type: "model-multi-selector", selectorModel: new EventSecondModel()},
                {item: "purchaseLink", label: "Ссылка", type: "text"},
            ]
        )
    }
}