import { Component, OnInit } from '@angular/core';
import { CampaignsService } from './campaigns.service';
import { ICampaign } from '../shared/models/campaign.model';
import { IPager } from '../shared/models/pager.model';
import { ConfigurationService } from '../shared/services/configuration.service';
import { Observable } from 'rxjs/Observable';
import { IPage } from '../shared/models/pagination.model';
import { ICampaignItem } from '../shared/models/campaignItem.model';

@Component({
    selector: 'app-campaigns',
    styleUrls: ['./campaigns.component.scss'],
    templateUrl: './campaigns.component.html'
})
export class CampaignsComponent implements OnInit {
    private interval = null;
//    paginationInfo: IPager;
    items: IPage<ICampaignItem>;
    campaigns: ICampaign;
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
            .catch((err) => this.handleError(err))
            .subscribe(campaigns => {
              this.items = campaigns;
                this.campaigns = campaigns;
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

