import CreateDto from "./dto/event-create.dto";
import ListDto from "./dto/event-list.dto";
import UpdateDto from "./dto/event-update.dto";
import Dto from "./dto/event.dto";
import BaseModel from "../base.model";
import HallModel from "../hall/hall.model";
import EventSecondModel from "../event_second/event-second.model";

export default class EventModel extends BaseModel<Dto, ListDto, CreateDto, UpdateDto> {
    constructor() {
        super(
            'event', 
            {"date": "Дата", "name": "Название", "time": "Время", "PlatformName": "Площадка", "HallName": "Зал"},
            [
                {item: "date", label: "Дата", type: "timestamp"},
                {item: "time", label: "Время", type: "text"},
                {item: "eventId", label: "Событие", type: "model-selector", selectorModel: new EventSecondModel()},
                {item: "hallId", label: "Зал", type: "model-selector", selectorModel: new HallModel()},
                {item: "price", label: "Цена от", type: "text"},
                {item: "soldOut", label: "Билеты распроданы", type: "selector", selectorOptions: {"Да": true, "Нет": false}},
                {item: "purchaseLink", label: "Ссылка", type: "text"},
            ]
        )
    }
}