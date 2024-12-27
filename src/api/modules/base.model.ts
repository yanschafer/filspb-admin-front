import ApiModelUtil from "@/utils/api-model.util";
import ApiResponseDto from "../dto/api-response.dto";
import ApiRequestDto from "../dto/api-request.dto";

export interface FieldDto {
    item: string,
    label: string,
    type: string,
    value?: any,
    selectorModel?: BaseModel<any, any, any, any>,
    selectorOptions?: Record<string, any>
}

export default class BaseModel<I, L, C, U> extends ApiModelUtil {
    constructor(baseRoute: string, public cols: Record<string, string>, public fields: FieldDto[]) {
        super(`/${baseRoute}`)
    }

    public async create(createDto: C): Promise<ApiResponseDto<I>> {
        return this.authorizedRequest(
            new ApiRequestDto('', 'POST', createDto)
        )
    }

    public async getAll(): Promise<ApiResponseDto<L[]>> {
        return this.authorizedRequest(
            new ApiRequestDto('', 'GET')
        )
    }

    public async getOne(itemId: number): Promise<ApiResponseDto<I>> {
        return this.authorizedRequest(
            new ApiRequestDto(`/${itemId}`, 'GET')
        )
    }

    public async patch(itemId: number, updateDto: U): Promise<ApiResponseDto<I>> {
        return this.authorizedRequest(
            new ApiRequestDto(`/${itemId}`, 'PATCH', updateDto)
        )
    }

    public async delete(itemId: number): Promise<ApiResponseDto<any>> {
        return this.authorizedRequest(
            new ApiRequestDto(`/${itemId}`, 'DELETE')
        )
    }

    public async toggleVisibility(itemId: number): Promise<ApiResponseDto<I>> {
        return this.authorizedRequest(
            new ApiRequestDto(`/visible/${itemId}`, 'PATCH')
        )
    }

    public async positionUp(itemId: number): Promise<ApiResponseDto<I>> {
        return this.authorizedRequest(
            new ApiRequestDto(`/position/${itemId}/up`, 'PATCH')
        )
    }

    public async positionDown(itemId: number): Promise<ApiResponseDto<I>> {
        return this.authorizedRequest(
            new ApiRequestDto(`/position/${itemId}/down`, 'PATCH')
        )
    }
}