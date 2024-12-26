import CreateDto from "./dto/people-contacts-create.dto";
import ListDto from "./dto/people-contacts-list.dto";
import UpdateDto from "./dto/people-contacts-update.dto";
import Dto from "./dto/people-contacts.dto";
import BaseModel from "../base.model";

export default class PeopleContactsModel extends BaseModel<Dto, ListDto, CreateDto, UpdateDto> {
    constructor() {
        super('people/contacts', {"surname": "Фамилия", "io": "ИО"}, [
            {item: "surname", label: "Дата", type: "text"},
            {item: "io", label: "Время", type: "text"},
            {item: "email", label: "Время", type: "text"},
            {item: "photo", label: "Время", type: "image"},
            {item: "workPosition", label: "Время", type: "text"},
        ])
    }
}