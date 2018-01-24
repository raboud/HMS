import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { JsonpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// Services
import { DataService } from './services/data.service';
import { BasketWrapperService} from './services/basket.wrapper.service';
import { SecurityService } from './services/security.service';
import { ConfigurationService } from './services/configuration.service';
import { StorageService } from './services/storage.service';

// Components:
import { Pager } from './components/pager/pager';
import { Header } from './components/header/header';
import { Identity } from './components/identity/identity';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

// Pipes:
import { UppercasePipe } from './pipes/uppercase.pipe';
import { AuthInterceptor } from './services/authInterceptor.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [
        CommonModule,
        NgbModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        // No need to export as these modules don't expose any components/directive etc'
        HttpClientModule,
        JsonpModule
    ],
    declarations: [
        Pager,
        Header,
        Identity,
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
        Pager,
        Header,
        Identity,
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
                BasketWrapperService,
                SecurityService,
                ConfigurationService,
                StorageService,
                {
                provide: HTTP_INTERCEPTORS,
                useClass: AuthInterceptor,
                multi: true
                }
            ]
        };
    }
}
