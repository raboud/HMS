import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { IUnit } from '../shared/models/unit.model';

@Injectable()
export class UnitService extends BaseService<IUnit> {
  init() {
    this.baseUrl = this.configurationService.serverSettings.catalogUrl + '/api/v1/units';
  }
}
