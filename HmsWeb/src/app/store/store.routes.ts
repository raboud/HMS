import { Routes, RouterModule } from '@angular/router';

import { BasketComponent } from './basket/basket.component';
import { CatalogComponent } from './catalog/catalog.component';
import { OrdersComponent } from './orders/orders.component';
import { OrdersDetailComponent } from './orders/orders-detail/orders-detail.component';
import { OrdersNewComponent } from './orders/orders-new/orders-new.component';
import { CampaignsComponent } from './campaigns/campaigns.component';
import { CampaignsDetailComponent } from './campaigns/campaigns-detail/campaigns-detail.component';
import { VendorListComponent } from './vendor/vendor-list/vendor-list.component';
import { VendorEditComponent } from './vendor/vendor-edit/vendor-edit.component';
import { TypeListComponent } from './type/type-list/type-list.component';
import { TypeEditComponent } from './type/type-edit/type-edit.component';
import { BrandListComponent } from './brand/brand-list/brand-list.component';
import { BrandEditComponent } from './brand/brand-edit/brand-edit.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductEditComponent } from './product/product-edit/product-edit.component';

export const routes: Routes = [
    { path: '', redirectTo: 'catalog', pathMatch: 'full' },
    { path: 'basket', component: BasketComponent },
    { path: 'catalog', component: CatalogComponent },
    { path: 'orders', component: OrdersComponent },
    { path: 'orders/:id', component: OrdersDetailComponent },
    { path: 'order', component: OrdersNewComponent },
    { path: 'campaigns', component: CampaignsComponent },
    { path: 'campaigns/:id', component: CampaignsDetailComponent },
    { path: 'vendor', component: VendorListComponent},
    { path: 'vendor/:id',  component: VendorEditComponent},
    { path: 'type', component: TypeListComponent},
    { path: 'type/:id', component: TypeEditComponent},
    { path: 'brand', component: BrandListComponent},
    { path: 'brand/:id', component: BrandEditComponent},
    { path: 'product', component: ProductListComponent},
    { path: 'product/:id', component: ProductEditComponent}
];

export const routing = RouterModule.forChild(routes);
