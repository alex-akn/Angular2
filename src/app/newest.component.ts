import { Component, OnInit } from '@angular/core';
import { App } from './app';
import { Cat } from './cat';
import { HeroService } from './hero.service';


@Component({
  moduleId: module.id,
  selector: 'newest-apps',
  template: `
  New applications
  `, 
  
})
export class NewestComponent implements OnInit { 
  title: string;
  selectedPrice: number;
  selectedCat: Cat;
  apps: App[];
  selectedApps: App[];
  categories: Cat[];
  constructor(private heroService: HeroService) {    
  }
  getMoreApps(): void{
    this.heroService.getMoreApps('news', 0, 20, 0, 0)
    .then(apps => {
      this.apps = apps;
      this.selectedApps=apps;
    });    
  }
  ngOnInit() :void {
    this.categories = this.heroService.getCategories();
    this.getMoreApps();
  }
  
  onSelectCat(cat: Cat): void {
    console.log(cat.name);
    this.selectedCat = cat;
    this.selectedApps = this.apps.filter(app => {
      if(cat.id === 0){return true;}
      return app.genres.indexOf(`${cat.id}`) !== -1;});
  }
  onSelectPrice(price: number): void {
    this.selectedPrice = price;
    this.selectedApps = this.apps.filter(app => true );
  }
}

