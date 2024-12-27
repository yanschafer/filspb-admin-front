import CreateDto from "./dto/documents-create.dto";
import ListDto from "./dto/documents-list.dto";
import UpdateDto from "./dto/documents-update.dto";
import Dto from "./dto/document.dto";
import BaseModel from "../base.model";

export default class DocumentsModel extends BaseModel<Dto, ListDto, CreateDto, UpdateDto> {
    constructor() {
        super('document', {"name": "Название"}, [
            {item: "name", label: "Название", type: "text"},
            {item: "doc", label: "Файл", type: "file"}
        ])
    }
}