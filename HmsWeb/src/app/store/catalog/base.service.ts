import { Injectable } from '@angular/core';

import { Observable, Observer } from 'rxjs';
import { map } from 'rxjs/operators';

import { DataService } from '../shared/services/data.service';
import { ConfigurationService } from '../shared/services/configuration.service';
import { IPage, ICrud } from '../shared/models/pagination.model';

@Injectable()
export class BaseService<T extends ICrud> {
  protected baseUrl = '';

  constructor(
    protected service: DataService,
    protected configurationService: ConfigurationService
  ) { }

  load(): Observable<boolean> {
    return this.configurationService.load().pipe(
      map( (x) => {
        this.init();
        return x;
      })
    );
  }

  init() {}

  getPage( pageIndex: number, pageSize: number, all?: boolean): Observable<IPage<T>> {
    let url = this.baseUrl + '/page?pageIndex=' + pageIndex + '&pageSize=' + pageSize;

    if (all) {
      url = url + '&all=' + all;
    }
    return this.service.get<IPage<T>>(url);
  }

  getItems(all?: boolean): Observable<T[]> {
    let url = this.baseUrl;
    if (all) {
      url += '?all=' + all;
    }

    return this.service.get<T[]>(url);
  }

  getItem(id: number): Observable<T> {
    let url = this.baseUrl;
    url = url + '/' + id;
    return this.service.get<T>(url);
  }

  updateItem(item: T) {
    return this.service.put(this.baseUrl + '/' + item.Id, item);
  }

  createItem(item: T) {
    return this.service.post(this.baseUrl, item);
  }

  deleteItem(item: T): Observable<boolean> {
    return this.service.delete(this.baseUrl + '/' + item.Id);
  }
}
