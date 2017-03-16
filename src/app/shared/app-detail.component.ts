import {
  Component,
  Input,
  trigger,
  state,
  style,
  transition,
  animate,  
} from '@angular/core';

import { App } from '../app';
import { IntercomService } from '../intercom.service';

@Component({
    moduleId: module.id,
    selector: 'app-detail',
    templateUrl: './app-detail.component.html',
    animations: [
    trigger('appState', [
      state('inactive', style({       
        transform: 'translateX(50%)', 
        //width : '0px',
        opacity: '0',
        visibility: 'hidden',
        display: 'none',            
      })),
      state('active',   style({             
        display: 'block',
        opacity: '1',
        visibility: 'visible',        
      })),
      transition('inactive => active', [style({height:'100%'}), animate('300ms ease-out')]),
      transition('active => inactive', animate('300ms ease-in')),
      transition('void => active', [
        style({transform: 'translateX(50%)', opacity: '0'}),
        animate(200)
      ])
    ])
  ]
})

export class AppDetailComponent {
    @Input() app: App;
    devices = [ 'iPhone', 'iPad', 'iOS Universal', 'Mac'];
}