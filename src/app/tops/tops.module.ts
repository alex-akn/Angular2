import { NgModule }      from '@angular/core';

import { TopsComponent } from './tops.component';
import { TopChartComponent } from './top-chart.component';

import { SharedModule }       from '../shared/shared.module';

@NgModule({
  imports: [ SharedModule ],
  declarations: [
    TopsComponent,
    TopChartComponent,
  ],
  exports: [TopsComponent],
  providers: [  ],  
})

export class TopsModule { }