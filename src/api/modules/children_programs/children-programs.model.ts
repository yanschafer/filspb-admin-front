import ChildrenProgramsCreateDto from "./dto/children-programs-create.dto";
import ChildrenProgramsListDto from "./dto/children-programs-list.dto";
import ChildrenProgramsUpdateDto from "./dto/children-programs-update.dto";
import ChildrenProgramsDto from "./dto/children-programs.dto";
import BaseModel from "../base.model";

export default class ChildrenProgramsModel extends BaseModel<ChildrenProgramsDto, ChildrenProgramsListDto, ChildrenProgramsCreateDto, ChildrenProgramsUpdateDto> {
    constructor() {
        super('children/programs', {"name": "Название"}, [
            {item: "name", label: "Название", type: "text"},
            {item: "image", label: "Изображение", type: "image"},
            {item: "description", label: "Описание", type: "writer"},
        ])
    }
}