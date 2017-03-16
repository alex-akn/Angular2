import { NgModule }      from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { RssGeneratorComponent } from './rss-generator.component';
import { SlashPipe } from './slash.pipe';



@NgModule({
  imports: [ FormsModule, CommonModule],
  declarations: [    
    RssGeneratorComponent,
    SlashPipe    
  ],
  exports: [ RssGeneratorComponent ],
  providers: [  ], 
})
export class RssGenModule { }
