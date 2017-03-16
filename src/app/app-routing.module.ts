import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DealsComponent } from './deals/deals.component';
import { TopsComponent } from './tops/tops.component';
import { RssGeneratorComponent } from './rss-generator/rss-generator.component';
import { AppFullDetailComponent } from './app-full-detail.component';
import { SearchComponent } from './search.component';
import { PopupNavComponent } from './popup-nav.component';

const routes: Routes = [
    { path: '', redirectTo: '/deals', pathMatch: 'full' },
    { path: 'deals', component: DealsComponent },
    { path: 'top-apps',  component: TopsComponent },
    { path: 'newest-apps', component: DealsComponent },
    { path: 'deals-mac', component: DealsComponent },
    { path: 'rss-generator', component: RssGeneratorComponent },
    { path: 'app/:id', component: AppFullDetailComponent },
    { path: 'search/:where/:what' , component: SearchComponent },
    { path: 'nav', component: PopupNavComponent, outlet: 'popup' },
    //{ path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
