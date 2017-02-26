import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DealsComponent } from './deals.component';
import { TopsComponent } from './tops.component';
import { NewestComponent } from './newest.component';
import { DealsMacComponent } from './deals-mac.component';
import { RssGeneratorComponent } from './rss-generator.component';
import { AppFullDetailComponent } from './app-full-detail.component';

const routes: Routes = [
    { path: '', redirectTo: '/deals', pathMatch: 'full' },
    { path: 'deals', component: DealsComponent },
    { path: 'top-apps',  component: TopsComponent },
    { path: 'newest-apps', component: NewestComponent },
    { path: 'deals-mac', component: DealsMacComponent },
    { path: 'rss-generator', component: RssGeneratorComponent },
    { path: 'app/:id', component: AppFullDetailComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
