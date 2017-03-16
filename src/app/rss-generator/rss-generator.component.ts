import { Component, OnInit } from '@angular/core';
import { IntercomService } from '../intercom.service';
import { CATEGORIES, SUBCATEGORIES } from '../categories';
import { Cat } from '../cat';


@Component({
  moduleId: module.id,
  selector: 'rss-generator',
  templateUrl: "./rss-generator.component.html" 
  
})
export class RssGeneratorComponent implements OnInit {
  categories:Cat[];
  subcat:Cat[];
  feed = new RssFeed("", 0, 0, "", true);
  url:string;
  constructor(private intercom: IntercomService){}
  ngOnInit() :void {
      this.intercom.setNewTitle("RSS Generator");
      this.categories = CATEGORIES.filter(cat => cat.id < 7000);
      this.createFeed();    
  }
  createFeed(){
    let url = "http://appstor.news/rss/";
    let device = this.feed.device === "" ? "" : `${this.feed.device}/`;
    let cat = this.feed.subcatId != 0 ? `genre=${this.feed.subcatId}/`
    : this.feed.catId != 0 ? `genre=${this.feed.catId}/` : "";
    let cost = this.feed.cost === "" ? "" : `${this.feed.cost}/`;
    let pop = this.feed.isPop ? `pop/` : "";
    this.url = `${url}${device}${cat}${cost}${pop}xml`;
  }

  deviceChanged(event:any){
    this.feed.device = event;
    if(event == "mac"){ 
      this.categories = CATEGORIES.filter(cat => cat.id > 12000 || cat.id === 0);
      this.clear();      
    }
    else{
      this.categories = CATEGORIES.filter(cat => cat.id < 7000);
      this.clear();
    }
    this.createFeed();
  }
  costChanged(event:any){
    this.feed.cost = event;
    this.createFeed();
  }
  catChanged(event:any){
    this.feed.catId = +event;
    if(event == 6014) {
      this.subcat = SUBCATEGORIES.filter(cat => cat.id < 8000 || cat.id === 0);      
    }
    if(event == 12006) {
      this.subcat = SUBCATEGORIES.filter(cat => cat.id > 12000 || cat.id ===0 );      
    }
    if (event != 6014 && event != 12006){
      this.subcat = undefined;
      this.feed.subcatId = 0;
    }
    this.createFeed();
  }
  clear(){
    this.feed.catId = 0;
    this.feed.subcatId = 0;
    this.subcat = undefined;
  }
  subcatChanged(event:any){
    this.feed.subcatId = event;
    this.createFeed();
  }
  popChanged(event:any){
    this.feed.isPop = event;
    this.createFeed();
  }

}

export class RssFeed {
  constructor(
    public device: string,
    public catId: number,
    public subcatId: number,   
    public cost: string,
    public isPop: boolean,
  ) {  }
}

