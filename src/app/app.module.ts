import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppComponent }  from './app.component';
import { AppFullDetailComponent } from './app-full-detail.component';
import { NavBarComponent } from './nav-bar.component';
import { SearchComponent } from './search.component';
import { PopupNavComponent } from './popup-nav.component';

import { HeroService } from './hero.service';
import { IntercomService } from './intercom.service';

import { AppRoutingModule } from './app-routing.module';
import { TopsModule } from './tops/tops.module';
import { DealsModule } from './deals/deals.module';
import { RssGenModule } from './rss-generator/rss-gen.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  imports:      [ 
    BrowserModule,
    HttpModule,
    DealsModule,
    TopsModule,
    RssGenModule,  
    AppRoutingModule,
    SharedModule
   ],
  declarations: [
    AppComponent,    
    AppFullDetailComponent,       
    NavBarComponent,
    SearchComponent,
    PopupNavComponent,    
  ],
  providers: [ HeroService, IntercomService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
