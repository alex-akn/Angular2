import { Component, OnInit, AnimationTransitionEvent } from '@angular/core';
import { App } from '../app';
import { CATEGORIES } from '../categories';
import { HeroService } from '../hero.service';
import { IntercomService } from '../intercom.service';
import { showMenuAnimation,
  hideMenuFullAnimation } from '../shared/animations';


import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/switchMap';

@Component({  
  moduleId: module.id,
  selector: 'top-apps',
  templateUrl: './tops.component.html',
  animations: [ showMenuAnimation, hideMenuFullAnimation ],  
})
export class TopsComponent implements OnInit { 
  title:string;
  selectedPrice=0;
  selectedCatId=0;
  selectedDevice=0;
  apps: App[]; 
  mobileMode:number;
  menuState:string;
  viewState:string='active';
  isSlidingRight:boolean=false;
  isSlidingLeft:boolean=false;
  limit:number = 20;
  action = "tops"; 
  isLoading:boolean = false;
  maxWidth:string;
  private appParams = new BehaviorSubject<number>(0);
  constructor(
    private heroService: HeroService,    
    private intercom: IntercomService) { }

  ngOnInit() :void {
    this.intercom.modeToggled$.subscribe(width => {      
      this.toggleMode(width);
    });
    
//switchMap cancels any in-flight requests if the user
//selects another parameter while still retrieving the previous list  
    this.appParams.switchMap((offset:number) => {      
      return this.heroService.getMoreApps(this.action, offset, this.limit,
      this.selectedCatId, this.selectedPrice, this.selectedDevice);
    }).subscribe(apps => {           
      apps.forEach(app => {        
        if(this.apps === undefined) {this.apps = [];}
        app.state = 'active';
        if(this.apps.every(a => a.id != app.id)) {           
          app.maxWidth = this.maxWidth;
          app.catNames = this.formatGenres(app.genres);               
          this.apps.push(app); }
      });
      this.isLoading = false;     
    });
    this.setTitle();
  }
 
  loadMore(el:any): void{
    this.isLoading = true;
    let offset = 0;
    this.apps.forEach(app => {
      if(app.state === 'active') {offset++;}
    })
    this.appParams.next(offset);
    //this.getMoreApps(offset);
  }
  
  onSelectCat(cat: number): void {    
    this.selectedCatId = cat;    
    this.mobileMode !== 2 ? this.hideMenu() : this.refresh();    
  }
  onSelectPrice(price: number): void {
    this.selectedPrice = price;
    this.refresh();
  }
  onSelectDevice(device: number): void {
    this.selectedDevice = device;
    this.mobileMode !== 2 ? this.hideMenu() : this.refresh();
  }
  private refresh(): void {
    if(this.apps === undefined){
      return;
    }
    this.apps = [];
    this.isLoading = true;
    this.appParams.next(0);    
  }  
  
  showMenu(): void{
    if(this.mobileMode === 1){
      this.menuState = 'opened';    
      return;
    }
    this.isSlidingRight = true;
    this.viewState = this.mobileMode === 0 ? 'inactive' : 'active';
    this.menuState = 'active';    
  }
  hideMenu(): void{
    this.menuState = 'inactive';
    this.viewState = 'active';
    if(this.mobileMode === 0) { this.isSlidingLeft = true; }     
  }
  hideMenuDone($e:AnimationTransitionEvent):void{
    if(this.mobileMode === 0) { this.isSlidingLeft = false; }     
  }
  showMenuDone($e:AnimationTransitionEvent):void{
    if(this.mobileMode === 0) { this.isSlidingRight = false; }
    this.refresh();
  }
  
  toggleMode(w:number):void{     
    let width:number=w;
    if(w < 768 && this.mobileMode !== 0) {
      this.mobileMode = 0;
      this.menuState = 'inactive';
      this.viewState = 'active';     
    }
    if(w >= 768 && w < 992 && this.mobileMode !== 1) {
      this.mobileMode = 1;
      this.viewState = 'active';
      this.menuState = 'inactive';                
    }
    if(w >= 992 && this.mobileMode !== 2) {
      this.mobileMode = 2;
      this.viewState = 'active';
      this.menuState = 'active';                
    }
    if(this.mobileMode !== 2) {width = w - 30 - 57 - 44 - 74 -17;}
    else{
      let cont = w >=1200 ? 1170 : w>= 992 ? 970 : w>=768 ? 750 : w;
      width = 0.75*cont - 30 - 57 - 44 - 74 -17;
    }
    this.maxWidth = `${width}px`;      
    if(this.apps !== undefined){
      this.apps.forEach(app => {
        app.maxWidth = this.maxWidth;
      });
    }
  }
  setTitle():void{
    this.title = "Топ приложений";
    this.intercom.setNewTitle(this.title);
  } 

  formatGenres(genres:any[]):string{
    let output = "";
    if(!Array.isArray(genres)){
      CATEGORIES.forEach(cat => {
        if(cat['id'] === +genres){ output = cat['name']; }
      });
      return output; 
    }    
    genres.forEach(genre => {
      CATEGORIES.forEach(cat => {
        if(cat['id'] === +genre){ output = `${output}, ${cat['name']}`; }
      })      
    })
    return output.slice(2);
  }
}


