import CreateDto from "./dto/slider-create.dto";
import ListDto from "./dto/slider-list.dto";
import UpdateDto from "./dto/slider-update.dto";
import Dto from "./dto/slider.dto";
import BaseModel from "../base.model";

export default class SliderModel extends BaseModel<Dto, ListDto, CreateDto, UpdateDto> {
    constructor() {
        super('slider', {"buttonText": "Текст ссылки", "desktopImage": "Слайд"}, [
            {item: "desktopImage", label: "Слайд (ПК)", type: "image"},
            {item: "mobileImage", label: "Слайд (мобильный)", type: "image"},
            {item: "link", label: "Ссылка", type: "text"},
            {item: "buttonText", label: "Текст ссылки", type: "text"},
        ])
    }
}