import { Component, OnInit, AnimationTransitionEvent } from '@angular/core';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { App } from '../app';
import { CATEGORIES } from '../categories';
import { HeroService } from '../hero.service';
import { IntercomService } from '../intercom.service';
import { showMenuAnimation,
  hideMenuFullAnimation } from '../shared/animations';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/switchMap';

const paths = {'deals':'pdrops', 'deals-mac':'pdrops', 'newest-apps':'news'};

@Component({  
  moduleId: module.id,
  selector: 'deals',
  templateUrl: './deals.component.html',
  animations: [ showMenuAnimation, hideMenuFullAnimation ],  
})
export class DealsComponent implements OnInit { 
  title:string;
  selectedPrice=0;
  selectedCatId=0;
  selectedDevice=2;
  apps: App[]; 
  mobileMode:number;
  menuState:string;
  viewState:string='active';
  isSlidingRight:boolean=false;
  isSlidingLeft:boolean=false;
  limit:number = 20;
  action:string = 'pdrops';
  isLoading:boolean = false;
  maxWidth:string;
  private appParams = new BehaviorSubject<number>(0);
  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private intercom: IntercomService) { }

  ngOnInit() :void {
    this.intercom.modeToggled$.subscribe(width => {      
      this.toggleMode(width);
    });
    this.route.url.subscribe(url => {      
      let path = url[0].path;    
      if(path === 'deals-mac') {this.selectedDevice = 3}    
      this.action = paths[path];
      this.setTitle(path);
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
          app.catNames = this.formatGenres(app.genres);
          app.maxWidth = this.maxWidth;                
          this.apps.push(app); }
      });
      this.isLoading = false;     
    });
    //let that = this;    
    //this.getMoreApps();
    //window.addEventListener("scroll", function() {that.onScroll()});
    //window.addEventListener("resize", function() {that.onResize()});
    //this.onResize();
  }

  /*getMoreApps(offset:number = 0): void{
    this.heroService.getMoreApps(this.action, offset, this.limit,
      this.selectedCatId, this.selectedPrice, this.selectedDevice)
    .then(apps => {
      apps.forEach(app => {
        if(this.apps === undefined) {this.apps = [];}
        app.state = 'active';
        if(this.apps.every(a => a.id != app.id)) { 
          app.catNames = this.formatGenres(app.genres);          
          this.apps.push(app); }
      });
      this.isLoading = false;     
    });    
  }*/
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
    let visibleApps = 0;
    this.apps.forEach(app => {      
      let isCat = this.selectedCatId === 0
     || app.genres.indexOf(`${this.selectedCatId}`) !== -1;
      let isPrice = this.isGoodPrice(app.newprice);      
      let isDevice = this.isEligibleDevice(+app.device);      
      if(isCat && isPrice && isDevice) {
        app.state = 'active';
        visibleApps++;
      }
      else  { app.state = 'inactive'; }
    });
    if(visibleApps < this.limit) {
      this.limit = this.limit - visibleApps;
      this.isLoading = true;
      this.appParams.next(visibleApps);
      //this.getMoreApps(visibleApps);
      this.limit = this.limit + visibleApps;
    }
  }  
  private isGoodPrice(price: string): boolean{
    if(this.selectedPrice === 0){ return true; }
    if(this.selectedPrice === 1){ return price === 'free';}
    if(this.selectedPrice === 2){ return price !== 'free';}
  }
  private isEligibleDevice(device:number): boolean{
    if(this.selectedDevice === 2) { return device !== 3; }
    if(this.selectedDevice === 1) { return device === 1 || device === 2; }
    if(this.selectedDevice === 0) { return device === 0 || device === 2; }
    if(this.selectedDevice === 3) { return device === 3; }    
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
  /*onScroll(){    
    if (document.body.scrollTop > 50 && !this.isBelow50) {
      this.isBelow50= true;       
    } 
    if (document.body.scrollTop <= 50 && this.isBelow50) {
      this.isBelow50= false;        
    }
  }  */
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
  setTitle(path:string):void{
    this.title = path == 'deals' ? 'Скидки в App Store' :
    path == 'deals-mac' ? 'Скидки в Mac App Store' :
    'Новинки в App Store';
    this.intercom.setNewTitle(this.title);
  } 

  formatGenres(genres:any[]):string{
    let output = "";    
    genres.forEach(genre => {
      CATEGORIES.forEach(cat => {
        if(cat['id'] === +genre){ output = `${output}, ${cat['name']}`; }
      })      
    })
    return output.slice(2);
  }
}


