import { Component, OnInit, AnimationTransitionEvent, state, transition, trigger, animate, style } from '@angular/core';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { App } from './app';
import { Cat } from './cat';
import { HeroService } from './hero.service';

const paths = {'deals':'pdrops', 'deals-mac':'pdrops', 'newest-apps':'news'};

@Component({  
  moduleId: module.id,
  selector: 'deals',
  templateUrl: './deals.component.html',
  animations: [
    trigger('hideMenu', [
      state('inactive', style({ 
        display: 'none',  
        transform: 'translateX(100%)'
      })),
      state('active',   style({        
        display: 'block',        
        left:'0px',
        transform: 'translateX(0)'
      })),
      transition('inactive => active', [
        style({
          position:'absolute',          
          display:'block',
          top:'0px',          
          transform: 'translateX(100%)'
        }), animate('400ms')]),
      transition('active => inactive', [
        animate('400ms', style({
          transform: 'translateX(100%)',
          left: '100%'
        }))
      ])     
    ]),
    trigger('showMenu', [
      state('inactive', style({        
        display: 'none',        
        transform: 'translateX(-100%)'       
      })),
      state('active',   style({ 
        display: 'block',        
        left: '0px',
        transform: 'translateX(0)'
      })),
      transition('inactive => active', [
        style({
          position:'absolute',          
          display:'block',
          top:'0px',          
          transform: 'translateX(-100%)'
        }), animate('400ms')]),
      transition('active => inactive', [
        animate('400ms', style({
          transform: 'translateX(-100%)',
          left: '-100%'
        }))
      ]),   
    ])    
  ],  
})
export class DealsComponent implements OnInit { 
  title = 'Price Drops';
  selectedPrice=0;
  selectedCatId=0;
  selectedDevice=0;
  apps: App[];  
  categories: Cat[];
  mobileModeOn:boolean=false;
  menuState:string='active';
  viewState:string='active';
  isSlidingRight:boolean=false;
  isSlidingLeft:boolean=false;
  limit:number = 20;
  action:string = 'pdrops';
  isLoading:boolean = false;
  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute) { }
  ngOnInit() :void {
    this.route.url.subscribe(url => {
      let path = url[0].path;    
      if(path === 'deals-mac') {this.selectedDevice = 3}    
      this.action = paths[path];
    });    
    let that = this;    
    this.getMoreApps();
    window.addEventListener("resize", function() {that.onResize()});
    this.onResize();
  }
  getMoreApps(offset:number = 0): void{
    this.heroService.getMoreApps(this.action, offset, this.limit,
      this.selectedCatId, this.selectedPrice, this.selectedDevice)
    .then(apps => {
      apps.forEach(app => {
        if(this.apps === undefined) {this.apps = [];}
        app.state = 'active';
        if(this.apps.every(a => a.id != app.id)) { this.apps.push(app); }
      });
      this.isLoading = false;     
    });    
  }
  loadMore(el:any): void{
    this.isLoading = true;
    let offset = 0;
    this.apps.forEach(app => {
      if(app.state === 'active') {offset++;}
    })
    this.getMoreApps(offset);
  }
  
  onSelectCat(cat: number): void {    
    this.selectedCatId = cat;    
    this.mobileModeOn ? this.hideMenu() : this.refresh();    
  }
  onSelectPrice(price: number): void {
    this.selectedPrice = price;
    this.refresh();
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
      if(isCat && isPrice) {
        app.state = 'active';
        visibleApps++;
      }
      else  { app.state = 'inactive'; }
    });
    if(visibleApps < this.limit) {
      this.limit = this.limit - visibleApps;
      this.getMoreApps(visibleApps);
      this.limit = this.limit + visibleApps;
    }
  }  
  private isGoodPrice(price: string): boolean{
    if(this.selectedPrice === 0){ return true; }
    if(this.selectedPrice === 1){ return price === 'free';}
    if(this.selectedPrice === 2){ return price !== 'free';}
  }

  showMenu(): void{
    this.isSlidingRight = true;
    this.viewState = 'inactive';
    this.menuState = 'active';    
  }
  hideMenu(): void{
    this.isSlidingLeft = true;
    this.menuState = 'inactive';
    this.viewState = 'active';    
  }
  hideMenuDone($e:AnimationTransitionEvent):void{
    this.isSlidingLeft = false;
    this.refresh();
  }
  showMenuDone($e:AnimationTransitionEvent):void{
    this.isSlidingRight = false;    
  }
  onResize(){    
    let w = window.innerWidth;
    let x = w < 992 && !this.mobileModeOn ? this.toggleMode() : 
    w >= 992 && this.mobileModeOn ? this.toggleMode() : 1;
  }
  toggleMode():void{
    //this.mobileModeOn = !this.mobileModeOn;
    if(this.mobileModeOn) {      
      this.menuState = 'active';
      this.viewState = 'active';
      this.mobileModeOn = false;
    }
    else{
      this.menuState = 'inactive';
      this.mobileModeOn = true;
    }
  }  
}


