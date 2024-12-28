import CreateDto from "./dto/review-create.dto";
import ListDto from "./dto/review-list.dto";
import UpdateDto from "./dto/review-update.dto";
import Dto from "./dto/review.dto";
import BaseModel from "../base.model";
import EventModel from "../event/event.model";

export default class ReviewModel extends BaseModel<Dto, ListDto, CreateDto, UpdateDto> {
    constructor() {
        super('review', {"date": "Дата", "EventName": "Событие", "name": "Имя"}, [
            {item: "event", label: "Событие", type: "model-selector", selectorModel: new EventModel()},
            {item: "name", label: "Имя", type: "text"},
            {item: "review", label: "Текст отзыва", type: "long-text"},
            {item: "date", label: "Дата", type: "text"},
        ])
    }
}