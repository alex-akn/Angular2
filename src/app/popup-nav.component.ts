import { Component, HostBinding } from '@angular/core';
import { Router }                 from '@angular/router';

@Component({
  moduleId: module.id,
  templateUrl: './popup-nav.component.html',
  styles: [ `:host {
    position: fixed;
    bottom: 0;
    right: 0;
    top: 0;
    left: 0;
    width: auto;
    height: auto;
    display: block;    
    overflow: hidden;    
    z-index: 8010;
    overflow: auto;
    overflow-y: scroll;
    background: url(img/overlay.png);
  }` ],
  
})
export class PopupNavComponent {  
  @HostBinding('style.display')   display = 'block';
  left:number;
  top:number;
  
  constructor(private router: Router) {}  
  cancel() {
    this.closePopup();
  }
  closePopup() {    
    this.router.navigate([{ outlets: { popup: null}}]);    
  }
  navigateTo(where:string){
    this.router.navigate([{ outlets: {primary: where, popup: null}}]);
  }
}