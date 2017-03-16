import { NgModule }      from '@angular/core';

import { AppsComponent } from './apps.component';
import { DealsComponent } from './deals.component';

import { SharedModule }       from '../shared/shared.module';

@NgModule({
  imports: [ SharedModule ],
  declarations: [    
    AppsComponent,
    DealsComponent,    
  ],
  exports: [ DealsComponent, ],
  providers: [  ],
  
})
export class DealsModule {  }
