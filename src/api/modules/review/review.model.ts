import CreateDto from "./dto/review-create.dto";
import ListDto from "./dto/review-list.dto";
import UpdateDto from "./dto/review-update.dto";
import Dto from "./dto/review.dto";
import BaseModel from "../base.model";
import EventModel from "../event/event.model";

export default class ReviewModel extends BaseModel<Dto, ListDto, CreateDto, UpdateDto> {
    constructor() {
        super('review', {"date": "Дата", "EventName": "Событие", "name": "Имя"}, [
            {item: "date", label: "Дата", type: "text"},
            {item: "name", label: "Время", type: "text"},
            {item: "review", label: "Время", type: "long-text"},
            {item: "event", label: "Время", type: "model-selector", selectorModel: new EventModel()},
        ])
    }
}