import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';
//import { RouterModule } from '@angular/router';

import { MenuComponent } from './menu.component';
import { AppDetailComponent } from './app-detail.component';

@NgModule({
  imports: [ CommonModule ],
  declarations: [    
    AppDetailComponent,
    MenuComponent,
  ],
  exports: [ CommonModule, /*RouterModule,*/MenuComponent, AppDetailComponent ],
  providers: [ ],
})
export class SharedModule { }
