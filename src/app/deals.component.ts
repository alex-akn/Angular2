import { Component, OnInit, AnimationTransitionEvent, state, transition, trigger, animate, style } from '@angular/core';
import { App } from './app';
import { Cat } from './cat';
import { HeroService } from './hero.service';


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
  apps: App[];  
  categories: Cat[];
  mobileModeOn:boolean=false;
  menuState:string='active';
  viewState:string='active';
  isSlidingRight:boolean=false;
  isSlidingLeft:boolean=false;
  constructor(private heroService: HeroService) { }
  getMoreApps(): void{
    this.heroService.getMoreApps('pdrops', 0, 20, 0, 0)
    .then(apps => {
      this.apps = apps;
      this.apps.forEach(app => {
        app.state = 'active';      
      });    
    });    
  }
  ngOnInit() :void {
    let that = this;
    this.categories = this.heroService.getCategories();
    this.getMoreApps();
    window.addEventListener("resize", function() {that.onResize()});
    this.onResize();
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
    this.apps.forEach(app => {      
      let isCat = this.selectedCatId === 0
     || app.genres.indexOf(`${this.selectedCatId}`) !== -1;
      let isPrice = this.isGoodPrice(app.newprice);      
      if(isCat && isPrice) { app.state = 'active'; }
      else  { app.state = 'inactive'; }
    });    
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
      this.mobileModeOn = false;
    }
    else{
      this.menuState = 'inactive';
      this.mobileModeOn = true;
    }
  }
}

