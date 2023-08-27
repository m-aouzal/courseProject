import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AdBannerComponent } from '../ads/ad-banner/ad-banner.component';
import { AdDirective } from '../ads/Ads.directive';
import { AdRecipeImageNameComponent } from '../ads/ad-banner/ad-Recipe-Image-Name/ad-Recipe-Image-Name.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AdDirective, AdBannerComponent, AdRecipeImageNameComponent],
  imports: [CommonModule, RouterModule],
  exports: [AdDirective, AdBannerComponent, AdRecipeImageNameComponent],
})
export class SharedModule {}
