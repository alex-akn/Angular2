import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeroService } from './hero.service';

import { App } from './app';


@Component({
  selector: 'search-result',
  template: `
  <h2>{{title}}</h2>
  <ng-container *ngFor="let app of apps">
    <app-detail [app]="app" ></app-detail> 
  </ng-container>
  `,   
})
export class SearchComponent implements OnInit {
    apps: App[];
    title: string = 'Search Results';
    constructor(
        private heroService: HeroService,
        private route: ActivatedRoute) { }
    ngOnInit() :void {        
        this.route.url.subscribe(url => {
            let where = url[1].path;
            let what = url[2].path;
            this.fetchResult(where, what);            
        });        
    }
    fetchResult(where: string, what: string){
         this.heroService.fetchData({'action' : 'search', 'where' : where, 'what': what})
            .then(result=> {                
                if(result === undefined ){ this.apps = []; return;}
                if(Array.isArray(result.results)){ 
                    this.apps = result.results; return;}
                else { this.apps = [];}
                this.title = "Nothing's Found";
            });
    }
}

