import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { AdBannerComponent } from '../ads/ad-banner/ad-banner.component';
import { AdDirective } from '../ads/Ads.directive';
import { AdRecipeImageNameComponent } from '../ads/ad-banner/ad-Recipe-Image-Name/ad-Recipe-Image-Name.component';
import { RouterModule } from '@angular/router';
import { AlertComponent } from './alert/alert.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        TooltipModule.forRoot(),
        BsDropdownModule.forRoot(),
        AdDirective,
        AdBannerComponent,
        AdRecipeImageNameComponent,
        AlertComponent,
    ],
    exports: [
        AdDirective,
        AdBannerComponent,
        AdRecipeImageNameComponent,
        AlertComponent,
    ],
})
export class SharedModule {}
