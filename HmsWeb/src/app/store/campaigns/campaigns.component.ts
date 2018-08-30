import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Component, OnInit } from '@angular/core';
import { CampaignsService } from './campaigns.service';
import { ConfigurationService } from '../shared/services/configuration.service';
import { IPage } from '../shared/models/pagination.model';
import { ICampaignItem } from '../shared/models/campaignItem.model';

@Component({
    selector: 'app-campaigns',
    styleUrls: ['./campaigns.component.scss'],
    templateUrl: './campaigns.component.html'
})
export class CampaignsComponent implements OnInit {
    private interval = null;
    items: IPage<ICampaignItem>;
    isCampaignDetailFunctionEnabled: boolean = false;
    errorReceived: boolean;
    page: number = 0;

    constructor(private service: CampaignsService, private configurationService: ConfigurationService) {
      console.log('CampaignsComponent');
    }

    ngOnInit() {
      console.log('CampaignsComponent2');

        this.configurationService.load().subscribe(() => {
          this.getCampaigns(9, 0);
        });
        this.isCampaignDetailFunctionEnabled = this.configurationService.serverSettings.activateCampaignDetailFunction;
    }

    onPageChange() {
        // event.preventDefault();
        this.getCampaigns(this.items.PageSize, this.page - 1);
    }

    getCampaigns(pageSize: number, pageIndex: number) {
        this.errorReceived = false;
        this.service.getCampaigns(pageIndex, pageSize)
          .pipe(
            catchError((err) => this.handleError(err))
          )
            .subscribe(campaigns => {
              this.items = campaigns;
        });
    }

    onNavigateToDetails(uri: string) {
        window.open(uri, '_blank');
    }

    private handleError(error: any) {
        this.errorReceived = true;
        return Observable.throw(error);
    }
}

