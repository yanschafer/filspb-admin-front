import CreateDto from "./dto/news-create.dto";
import ListDto from "./dto/news-list.dto";
import UpdateDto from "./dto/news-update.dto";
import Dto from "./dto/news.dto";
import BaseModel from "../base.model";

export default class NewsModel extends BaseModel<Dto, ListDto, CreateDto, UpdateDto> {
    constructor() {
        super('news', {"name": "Название"}, [
            {item: "date", label: "Дата", type: "timestamp"},
            {item: "name", label: "Название", type: "text"},
            {item: "image", label: "Изображение", type: "image"},
            {item: "shortDescription", label: "Краткий текст новости", type: "long-text"},
            {item: "description", label: "Полный текст новости", type: "writer"},
            // {item: "authors", label: "Авторы", type: "sequential"}
        ])
    }
}