import ApiErrorDto from "@/api/dto/api-error.dto";
import ApiResponseDto from "@/api/dto/api-response.dto";
import BaseModel from "@/api/modules/base.model";
import ChildrenProgramsModel from "@/api/modules/children_programs/children-programs.model";
import DepartmentContactsModel from "@/api/modules/department_contacts/department-contacts.model";
import HallModel from "@/api/modules/hall/hall.model";
import NewsModel from "@/api/modules/news/news.model";
import PartnersModel from "@/api/modules/partners/partners.model";
import PeopleModel from "@/api/modules/people/people.model";
import { defineStore } from "pinia";
import PeopleCategoryModel from '../api/modules/people_category/people-category.model';
import PeopleContactsModel from "@/api/modules/people_contacts/people-contacts.model";
import VacancyModel from "@/api/modules/vacancy/vacancy.model";
import TagModel from "@/api/modules/tag/tag.model";
import PlatfromModel from "@/api/modules/platform/platform.model";
import DocumentsModel from "@/api/modules/documents/documents.model";
import EventModel from "@/api/modules/event/event.model";
import ReviewModel from "@/api/modules/review/review.model";
import EventSecondModel from "@/api/modules/event_second/event-second.model";
import { AdminsModel } from "@/api/modules/auth/models/admins.model";

export const selectedModelStore = defineStore("SelectedModel", {
    state: () => ({
        cols: {},
        items: [],
        fields: [{
            item: "string",
            label: "string",
            type: "string",
            value: "any",
            selectorModel: new BaseModel("", {}, []),
            selectorOptions: []
        }],
        showPositionAndVisibilityControls: true,
        selectedItem: {},
        tabToModel: {
            'affiche': () => new EventModel(),
            'halls': () => new HallModel(),
            'review': () => new ReviewModel(),
            'platform': () => new PlatfromModel(),
            'events': () => new EventSecondModel(),
            'tags': () => new TagModel(),
            'vacancy': () => new VacancyModel(),
            'children': () => new ChildrenProgramsModel(),
            'docs': () => new DocumentsModel(),
            'employee-categories': () => new PeopleCategoryModel(),
            'employee': () => new PeopleModel(),
            'employee-contacts': () => new PeopleContactsModel(),
            'dep-contacts': () => new DepartmentContactsModel(),
            'news': () => new NewsModel(),
            'partners': () => new PartnersModel(),
            'admins': () => new AdminsModel()
        },
        modelName: "",
        creation: false,
        model: new BaseModel('', {}, [])
    }),
    actions: {
        async refreshModel() {
            this.loadModel(this.model);
        },
        async loadModelByName(name: string) {
            this.items = []
            this.cols = {}
            this.fields = []
            this.modelName = name
            console.log("CLEARED")
            return await this.loadModel(this.tabToModel[name]())
        },
        async loadModel<I, L, C, U>(model: BaseModel<I, L, C, U>) {
            this.cols = Object.keys(model.cols).map(el => ({
                key: el,
                header: model.cols[el]   
            }))
            this.model = model
            this.fields = model.fields
            this.showPositionAndVisibilityControls = model.showControls
            const getAllRes = await model.getAll()

            if (!getAllRes.success)
                return getAllRes
            
            this.items = getAllRes.getData()

            console.log("LOADED", this.model, this.fields, this.items, this.cols)
            
            return getAllRes
        },
        async selectRow<I, L, C, U>(modelName: string, id: any) {
            //Try load, if req failed return error
            if (this.items.length <= 0 && !(await this.loadModelByName(modelName)).success) return new ApiResponseDto(false, null, new ApiErrorDto(500, 'Server error', ''))
            const model = this.tabToModel[modelName]()
        
            const getOneRes = await model.getOne(id)

            if (!getOneRes.success)
                return getOneRes
            
            this.selectedItem = getOneRes.getData()
            this.fields = this.fields.map(el => {
                el.value = this.selectedItem[el.item]
                if (el.type == 'timestamp') {
                    el.dateValue = new Date(this.selectedItem[el.item])
                }
                if (el.type == 'sequential') {
                    el.value = JSON.parse(this.selectedItem[el.item])
                }
                return el
            })

            return getOneRes
        },
        updateSelectorFields(modelOptions: any) {
            this.fields = this.fields.map(el => {
                if ((el.type == 'model-selector' || el.type == 'selector') && el.value) {
                    el.value = modelOptions[el.item].filter(i => el.value == i.value)[0]
                }
                return el
            })
        },
        toggleCreation(creation: boolean) {
            this.creation = creation
        },
        swapTo(modelName: string) {
            console.log("SWAP TO", modelName)
        },
        swapToEdit(modelName: string, rowId: string) {
            console.log("SWAP TO", modelName)
        },
        toggleRowView(id: number) {
            this.model.toggleVisibility(id)
        },
        moveRowUp(id: number) {
            this.model.positionUp(id)
        },
        moveRowDown(id: number) {
            this.model.positionDown(id)
        },
        delete(id: number) {
            this.model.delete(id)
        },
        async save() {
            const buildObject = {}
            
            this.fields.forEach(el => {
                if (el.value) {
                    if (el.type == 'sequential') {
                        buildObject[el.item] = JSON.stringify(el.value)
                    } else {
                        buildObject[el.item] = el.value
                    }
                    if (el.type == 'file') {
                        buildObject["docName"] = el.docName
                    }
                    if (el.type == 'selector' || el.type == 'model-selector') {
                        buildObject[el.item] = el.value.value
                    }
                }
            })
            
            buildObject.visible = true
            buildObject.position = this.items.length

            if (this.creation) return await this.model.create(buildObject)
            else return await this.model.patch(this.selectedItem.id, buildObject)
        }
    }
})