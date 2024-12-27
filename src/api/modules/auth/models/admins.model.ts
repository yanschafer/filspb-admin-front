import type AdminDto from '../dto/admin.dto';
import type AdminCreateDto from '../dto/admin-create.dto';
import type AdminUpdateDto from '../dto/admin-update.dto';
import BaseModel from '../../base.model';

export class AdminsModel extends BaseModel<AdminDto, AdminDto, AdminCreateDto, AdminUpdateDto> {
  constructor() {
    super('auth/admin', {"login": "Login"}, [
      {item: "login", label: "Login", type: "text"},
      {item: "pass", label: "Password", type: "text-hidden"},
    ], false);
  }
}
