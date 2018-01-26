import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from '../../../shared/models/product.model';
import { ProductService } from '../../product.service';
import { ConfigurationService } from '../../../shared/services/configuration.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})

export class ProductDetailComponent implements OnInit {
  item: IProduct;
  pageTitle = '';
  errorMessage: string;
  htmlContent: SafeHtml;

  constructor(
    private service: ProductService,
    private configurationService: ConfigurationService,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = +params['id']; // (+) converts string 'id' to a number
      if (this.configurationService.isReady) {
        console.log('ready');
        this.getItem(id);
      } else {
        this.configurationService.settingsLoaded$.subscribe(x => {
          console.log('settingsloaded');
          this.getItem(id);
        });

    }});
  }

  getItem(id: number) {
    this.service.getItem(id).subscribe(item => {
      this.item = item;
      this.pageTitle = item.Name;
      this.htmlContent = this.sanitizer.bypassSecurityTrustHtml(this.item.Description);
    });
  }


}
