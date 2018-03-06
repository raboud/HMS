import { Component, OnInit } from '@angular/core';
import { CampaignsService } from '../campaigns.service';
import { ICampaignItem } from '../../shared/models/campaignItem.model';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-campaigns-detail',
    styleUrls: ['./campaigns-detail.component.scss'],
    templateUrl: './campaigns-detail.component.html'
})
export class CampaignsDetailComponent implements OnInit {
    public campaign: ICampaignItem = <ICampaignItem>{};

    constructor(private service: CampaignsService, private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            const id = +params['id']; // (+) converts string 'id' to a number
            this.getCampaign(id);
        });
    }

    getCampaign(id: number) {
        this.service.getCampaign(id).subscribe(campaign => {
            this.campaign = campaign;
        });
    }
}
