import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppComponent }  from './app.component';
import { AppDetailComponent } from './app-detail.component';
import { AppFullDetailComponent } from './app-full-detail.component';
import { MenuComponent } from './menu.component';
import { AppsComponent } from './apps.component';
import { DealsComponent } from './deals.component';
import { TopsComponent } from './tops.component';
import { RssGeneratorComponent } from './rss-generator.component';

import { HeroService } from './hero.service';

import { AppRoutingModule } from './app-routing.module';

@NgModule({
  imports:      [ 
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
   ],
  declarations: [
    AppComponent,
    AppDetailComponent,
    AppFullDetailComponent,    
    AppsComponent,
    DealsComponent,
    TopsComponent,
    MenuComponent,
    RssGeneratorComponent,
  ],
  providers: [ HeroService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
