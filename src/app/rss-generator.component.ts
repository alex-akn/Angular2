import { Component, OnInit } from '@angular/core';
import { HeroService } from './hero.service';


@Component({
  moduleId: module.id,
  selector: 'rss-generator',
  template: `
  RSS Generator
  `, 
  providers: [HeroService],
})
export class RssGeneratorComponent implements OnInit {   
  constructor(private heroService: HeroService) {    
  }
  ngOnInit() :void {
      //fetch something    
  }
}

