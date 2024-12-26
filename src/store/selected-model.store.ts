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

export const selectedModelStore = defineStore("SelectedModel", {
    state: () => ({
        cols: [],
        items: [],
        selectedItem: {},
        tabToModel: {
            'affiche': new EventModel(),
            'halls': new HallModel(),
            'review': new ReviewModel(),
            'platform': new PlatfromModel(),
            'events': new EventSecondModel(),
            'tags': new TagModel(),
            'vacancy': new VacancyModel(),
            'children': new ChildrenProgramsModel(),
            'docs': new DocumentsModel(),
            'employee-categories': new PeopleCategoryModel(),
            'employee': new PeopleModel(),
            'employee-contacts': new PeopleContactsModel(),
            'dep-contacts': new DepartmentContactsModel(),
            'news': new NewsModel(),
            'partners': new PartnersModel()
        },
        model: new BaseModel('', {}, [])
    }),
    actions: {
        async loadModelByName(name: string) {
            return await this.loadModel(this.tabToModel[name])
        },
        async loadModel<I, L, C, U>(model: BaseModel<I, L, C, U>) {
            this.cols = Object.keys(model.cols).map(el => ({
                key: el,
                header: model.cols[el]   
            }))
            const getAllRes = await model.getAll()

            if (!getAllRes.success)
                return getAllRes
            
            this.items = getAllRes.getData()

            return getAllRes
        },
        async selectRow<I, L, C, U>(modelName: string, id: number) {
            //Try load, if req failed return error
            if (this.items.length <= 0 && !(await this.loadModelByName(modelName)).success) return new ApiResponseDto(false, null, new ApiErrorDto(500, 'Server error', ''))
            const model = this.tabToModel[modelName]
        
            const getOneRes = await model.getOne(id)

            if (!getOneRes.success)
                return getOneRes
            
            this.selectedItem = getOneRes.getData()

            return getOneRes
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
        }
    }
})