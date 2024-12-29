import CreateDto from "./dto/slider-create.dto";
import ListDto from "./dto/slider-list.dto";
import UpdateDto from "./dto/slider-update.dto";
import Dto from "./dto/slider.dto";
import BaseModel from "../base.model";

export default class SliderModel extends BaseModel<Dto, ListDto, CreateDto, UpdateDto> {
    constructor() {
        super('slider', {"image": "Слайд"}, [
            {item: "image", label: "Слайд", type: "image"},
        ])
    }
}