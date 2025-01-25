import { Injectable } from '@angular/core';
import { User, UserApiModel } from '@app/interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserMapperService {
  mapApiToDomain(apiModel: UserApiModel): User {
    return {
      id: apiModel.uuid,
      email: apiModel.email,
      password: apiModel.password,
      lang: apiModel.lang,
      loginType: apiModel.loginType,
      img: apiModel.img,
      name: apiModel.name,
      isVerified: apiModel.isVerified,
      newsletter: apiModel.newsletter,
    };
  }

  mapDomainToApi(domainModel: User): UserApiModel {
    return {
      uuid: domainModel.id,
      email: domainModel.email,
      password: domainModel.password,
      lang: domainModel.lang,
      loginType: domainModel.loginType,
      img: domainModel.img,
      name: domainModel.name,
      isVerified: domainModel.isVerified,
      newsletter: domainModel.newsletter,
    };
  }
}
