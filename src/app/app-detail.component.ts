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
        //height: '0px',
        width : '0px',
        opacity: '0',
        visibility: 'hidden',
        display: 'none',        
      })),
      state('active',   style({             
        display: 'block',
        opacity: '1',
        visibility: 'visible',        
      })),
      transition('inactive => active', animate('500ms ease-out')),
      transition('active => inactive', animate('500ms ease-in')),
      transition('void => active', [
        style({transform: 'translateX(50%)', opacity: '0'}),
        animate(200)
      ])
    ])
  ]
})

export class AppDetailComponent {
    @Input() app: App;       
}