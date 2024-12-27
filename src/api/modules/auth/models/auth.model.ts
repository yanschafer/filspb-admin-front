import AuthInputDto from '@/api/modules/auth/dto/login/auth-input.dto';
import ApiResponseDto from '@/api/dto/api-response.dto';
import TokenPairDto from '@/api/modules/auth/dto/token-pair.dto';
import ApiRequestDto from '@/api/dto/api-request.dto';
import AuthorizedUserDto from '@/api/modules/auth/dto/authorized-user.dto';
import TokenUtil from '@/utils/token.util';
import type AdminDto from '../dto/admin.dto';
import type AdminCreateDto from '../dto/admin-create.dto';
import type AdminUpdateDto from '../dto/admin-update.dto';
import BaseModel from '../../base.model';

export class AuthModel extends BaseModel<AdminDto, AdminDto, AdminCreateDto, AdminUpdateDto> {
  constructor() {
    super('', {"login": "Login"}, [
      {item: "login", label: "Login", type: "text"},
      {item: "pass", label: "Password", type: "text-hidden"},
    ]);
  }

  public async auth(
    authInputDto: AuthInputDto,
  ): Promise<ApiResponseDto<TokenPairDto>> {
    const tokenPair = await this.unauthorizedRequest<TokenPairDto>(
      new ApiRequestDto('/auth', 'POST', authInputDto),
    );
    if (tokenPair.success) {
      TokenUtil.login(tokenPair.getData());
      const authorizedUserDto = await this.requestAuthorizedData();
      TokenUtil.setAuthorized(authorizedUserDto.getData());
    }
    return tokenPair;
  }

  public async requestAuthorizedData(): Promise<
    ApiResponseDto<AuthorizedUserDto>
  > {
    return await this.authorizedRequest(
      new ApiRequestDto('/auth/authorized', 'GET'),
    );
  }
}

export default new AuthModel();
