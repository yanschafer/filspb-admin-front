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
import SliderModel from "@/api/modules/slider/slider.model";

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
            'admins': () => new AdminsModel(),
            'slider': () => new SliderModel(),
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
            return await this.loadModel(this.tabToModel[name]())
        },
        async loadModel<I, L, C, U>(model: BaseModel<I, L, C, U>) {
            this.cols = Object.keys(model.cols).map(el => ({
                key: el,
                header: model.cols[el]   
            }))
            this.model = model
            this.fields = model.fields
            this.fields.push({item: 'position'})
            this.fields.push({item: 'visible'})

            this.showPositionAndVisibilityControls = model.showControls

            const getAllRes = await model.getAll()

            if (!getAllRes.success)
                return getAllRes
            
            this.items = getAllRes.getData()

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
            this.fields = await Promise.all(this.fields.map(async el => {
                el.value = this.selectedItem[el.item] ? this.selectedItem[el.item] : ""
                
                if (el.type == 'timestamp') {
                    el.dateValue = new Date(this.selectedItem[el.item])
                }
                else if (el.type == 'sequential') {
                    el.value = JSON.parse(this.selectedItem[el.item])
                }
                else if (el.type == 'model-selector' && el.selectorModel) {
                    // Получаем все опции для селектора
                    const options = await el.selectorModel.getAll()
                    if (options.success) {
                        const selectedOption = options.getData().find(opt => opt.id === el.value)
                        if (selectedOption) {
                            el.value = { value: selectedOption.id, name: selectedOption.name }
                        }
                    }
                }
                else if (el.type == 'selector' && el.selectorOptions) {
                    // Для обычных селекторов (например, да/нет)
                    const entries = Object.entries(el.selectorOptions)
                    const selectedEntry = entries.find(([_, value]) => value === el.value)
                    if (selectedEntry) {
                        el.value = { value: el.value, name: selectedEntry[0] }
                    }
                }
                
                return el
            }))

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
        swap() {},
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
        async save(settings = false) {
            const buildObject = {}
            
            this.fields.forEach(el => {
                if (el.type == 'selector' || el.type == 'model-selector') {
                    if (typeof el.selectorOptions === 'object' && 
                        Object.values(el.selectorOptions).every(v => typeof v === 'boolean')) {
                        buildObject[el.item] = el.value?.value ?? false
                    } else {
                        buildObject[el.item] = el.value?.value || null
                    }
                } else {
                    buildObject[el.item] = el.value
                }

                if (el.value) {
                    if (el.type == 'sequential') {
                        buildObject[el.item] = JSON.stringify(el.value)
                    }
                    if (el.type == 'file') {
                        buildObject["docName"] = el.docName
                    }
                }
            })

            if (this.creation) {
                buildObject.visible = true
                if (this.items.length > 0)
                    buildObject.position = this.items[this.items.length - 1].position + 1
                else
                    buildObject.position = 1
            }
            
            if (this.creation) return await this.model.create(buildObject)
            else return await this.model.patch(this.selectedItem.id, buildObject)
        }
    }
})