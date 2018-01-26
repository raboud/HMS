﻿import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

import { DataService } from '../shared/services/data.service';
import { ICampaign } from '../shared/models/campaign.model';
import { ICampaignItem } from '../shared/models/campaignItem.model';
import { SecurityService } from '../shared/services/security.service';
import { ConfigurationService } from '../shared/services/configuration.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/map';


@Injectable()
export class CampaignsService {
    private marketingUrl: string = '';
    private buyerId: string = '';

    constructor(
      private service: DataService,
      private identityService: SecurityService,
      private configurationService: ConfigurationService
    ) {
        if (this.identityService.IsAuthorized) {
            if (this.identityService.UserData) {
                this.buyerId = this.identityService.UserData.sub;
            }
        }

        this.configurationService.load().subscribe(() => {
            this.marketingUrl = this.configurationService.serverSettings.marketingUrl;
        });
    }

    getCampaigns(pageIndex: number, pageSize: number): Observable<ICampaign> {
        let url = this.marketingUrl + '/api/v1/campaigns/user';
        url = url + '?pageIndex=' + pageIndex + '&pageSize=' + pageSize;

        return this.service.get(url).map((response: Response) => {
            return response.json();
        });
    }

    getCampaign(id: number): Observable<ICampaignItem> {
        const url = this.marketingUrl + '/api/v1/campaigns/' + id;

        return this.service.get(url).map((response: Response) => {
            return response.json();
        });
    }
}

