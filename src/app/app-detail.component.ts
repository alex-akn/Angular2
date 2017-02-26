import {
  Component,
  Input,
  trigger,
  state,
  style,
  transition,
  animate,  
} from '@angular/core';

import { App } from './app';

@Component({
    moduleId: module.id,
    selector: 'app-detail',
    templateUrl: './app-detail.component.html',
    animations: [
    trigger('appState', [
      state('inactive', style({
        backgroundColor: '#cfd8dc',
        height: '0px',
        visibility: 'hidden',
        display: 'none',        
      })),
      state('active',   style({  
        backgroundColor: '#eee',      
        display: 'block',
        visibility: 'visible',        
      })),
      transition('inactive => active', animate('300ms ease-in')),

      transition('active => inactive', animate('300ms ease-out'))
    ])
  ]
})

export class AppDetailComponent {
    @Input() app: App;       
}