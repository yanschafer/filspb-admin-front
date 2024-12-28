import CreateDto from "./dto/system-configuration-create.dto";
import ListDto from "./dto/system-configuration-list.dto";
import UpdateDto from "./dto/system-configuration-update.dto";
import Dto from "./dto/system-configuration.dto";
import BaseModel from "../base.model";
/*

    val id: Int,
    val name:String,
    val email:String,
    val address:String,
    val city:String,
    val addressShort:String,
    val vk:String,
    val telegram:String,
    val soundCloud:String,

*/
export default class SystemConfigurationModel extends BaseModel<Dto, ListDto, CreateDto, UpdateDto> {
    constructor() {
        super('system', {}, [
            {item: "name", label: "Телефон", type: "text"},
            {item: "email", label: "Email", type: "text"},
            {item: "address", label: "Адрес", type: "text"},
            {item: "city", label: "Город", type: "text"},
            {item: "addressShort", label: "Короткий адрес", type: "text"},
            {item: "vk", label: "VK", type: "text"},
            {item: "telegram", label: "Telegram", type: "text"},
            {item: "soundCloud", label: "Sound Cloud", type: "text"},
        ])
    }
}