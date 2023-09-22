import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

import { HomeComponent } from './home.component';
import { Shell } from '@app/shell/shell.service';
import { HomeTabsComponent } from './components/home-tabs/home-tabs.component';
import { HomePersonalInformationComponent } from './components/home-personal-information/home-personal-information.component';
import { HomeDashboardComponent } from './components/home-dashboard/home-dashboard.component';
import { HomeMedicalComponent } from './components/home-medical/home-medical.component';

const routes: Routes = [
  Shell.childRoutes([
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    {
      path: 'home',
      component: HomeComponent,
      children: [
        {
          path: '',
          pathMatch: 'full',
          redirectTo: 'tabs',
        },
        {
          path: 'tabs',
          component: HomeTabsComponent,
          children: [
            {
              path: '',
              pathMatch: 'full',
              redirectTo: 'personal-information',
            },
            {
              path: 'dashboard',
              component: HomeDashboardComponent,
            },
            {
              path: 'personal-information',
              component: HomePersonalInformationComponent,
            },
            {
              path: 'medical-information',
              component: HomeMedicalComponent,
            },
          ],
        },
      ],
    },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class HomeRoutingModule {}
