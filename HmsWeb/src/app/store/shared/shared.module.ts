import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// Services
import { DataService } from './services/data.service';
import { SecurityService } from './services/security.service';
import { ConfigurationService } from './services/configuration.service';
import { StorageService } from './services/storage.service';

// Components:
import { PagerComponent } from './components/pager/pager';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

// Pipes:
import { UppercasePipe } from './pipes/uppercase.pipe';
import { AuthInterceptor } from './services/authInterceptor.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BasketService } from '../basket/basket.service';

@NgModule({
    imports: [
        CommonModule,
        NgbModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        // No need to export as these modules don't expose any components/directive etc'
        HttpClientModule,
    ],
    declarations: [
        PagerComponent,
        PageNotFoundComponent,
        UppercasePipe
    ],
    exports: [
        // Modules
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        // Providers, Components, directive, pipes
        PagerComponent,
        PageNotFoundComponent,
        UppercasePipe
    ]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [
                // Providers
                DataService,
                SecurityService,
                ConfigurationService,
                StorageService,
//                BasketService,
                {
                provide: HTTP_INTERCEPTORS,
                useClass: AuthInterceptor,
                multi: true
                }
            ]
        };
    }
}
