/*

    val id: Int,
    val surname:String,
    val io:String,
    val email:String,
    val photo:String,
    val workPosition:String,
    val visible:Boolean,
    val position:Int,
*/

export default class PeopleContactsUpdateDto {
    constructor(
        public surname: string | null = null,
        public io: string | null = null,
        public email: string | null = null,
        public photo: string | null = null,
        public workPosition: string | null = null,
        public visible: boolean | null = null,
        public position: number | null = null
    ) {}
}