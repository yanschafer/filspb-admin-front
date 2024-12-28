import CreateDto from "./dto/people-contacts-create.dto";
import ListDto from "./dto/people-contacts-list.dto";
import UpdateDto from "./dto/people-contacts-update.dto";
import Dto from "./dto/people-contacts.dto";
import BaseModel from "../base.model";

export default class PeopleContactsModel extends BaseModel<Dto, ListDto, CreateDto, UpdateDto> {
    constructor() {
        super('people/contacts', {"surname": "Фамилия", "io": "ИО"}, [
            {item: "surname", label: "Фамилия", type: "text"},
            {item: "io", label: "ИО", type: "text"},
            {item: "photo", label: "Фото", type: "image"},
            {item: "workPosition", label: "Должность", type: "text"},
            {item: "email", label: "E-Mail", type: "text"},
        ])
    }
}