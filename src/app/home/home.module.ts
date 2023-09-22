import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { SharedModule } from '@shared';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { HomeTabsComponent } from './components/home-tabs/home-tabs.component';
import { HomePersonalInformationComponent } from './components/home-personal-information/home-personal-information.component';
import { HomeDashboardComponent } from './components/home-dashboard/home-dashboard.component';
import { HomeMedicalComponent } from './components/home-medical/home-medical.component';

@NgModule({
  imports: [CommonModule, TranslateModule, SharedModule, IonicModule, HomeRoutingModule],
  declarations: [
    HomeComponent,
    HomeTabsComponent,
    HomePersonalInformationComponent,
    HomeDashboardComponent,
    HomeMedicalComponent,
  ],
})
export class HomeModule {}
