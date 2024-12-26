import CreateDto from "./dto/department-contacts-create.dto";
import ListDto from "./dto/department-contacts-list.dto";
import UpdateDto from "./dto/department-contacts-update.dto";
import Dto from "./dto/department-contacts.dto";
import BaseModel from "../base.model";

export default class DepartmentContactsModel extends BaseModel<Dto, ListDto, CreateDto, UpdateDto> {
    constructor() {
        super('department/contacts', {"name": "Название"}, [
            {item: "name", label: "Название", type: "text"},
            {item: "phone", label: "Контактный телефон", type: "text"},
            {item: "timeTable", label: "Расписание", type: "writer"},
        ])
    }
}