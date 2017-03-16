import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
<navigation></navigation> 
  <router-outlet ></router-outlet>
  <router-outlet name="popup"></router-outlet>
  `
})
export class AppComponent {
  title = 'App Store News';
  
}
