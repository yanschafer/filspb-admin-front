import CreateDto from "./dto/hall-create.dto";
import ListDto from "./dto/hall-list.dto";
import UpdateDto from "./dto/hall-update.dto";
import Dto from "./dto/hall.dto";
import BaseModel from "../base.model";
import PlatfromModel from "../platform/platform.model";

export default class HallModel extends BaseModel<Dto, ListDto, CreateDto, UpdateDto> {
    constructor() {
        super('hall',  {"name": "Название"}, [
            {item: "date", label: "Дата", type: "text"},
            {item: "name", label: "Время", type: "text"},
            {item: "platform", label: "Площадка", type: "model-selector", selectorModel: new PlatfromModel()},
        ])
    }
}