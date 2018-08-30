import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

import { DataService } from '../shared/services/data.service';
import { ICampaign } from '../shared/models/campaign.model';
import { ICampaignItem } from '../shared/models/campaignItem.model';
import { SecurityService } from '../shared/services/security.service';
import { ConfigurationService } from '../shared/services/configuration.service';
import { IPage } from '../shared/models';

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

    getCampaigns(pageIndex: number, pageSize: number): Observable<IPage<ICampaignItem>> {
        let url = this.marketingUrl + '/api/v1/campaigns/user';
        url = url + '?pageIndex=' + pageIndex + '&pageSize=' + pageSize;

        return this.service.get<IPage<ICampaignItem>>(url);
    }

    getCampaign(id: number): Observable<ICampaignItem> {
        const url = this.marketingUrl + '/api/v1/campaigns/' + id;

        return this.service.get<ICampaignItem>(url);
    }
}

