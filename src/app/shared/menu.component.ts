import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Cat } from '../cat';
import { HeroService } from '../hero.service';
import { IntercomService } from '../intercom.service';


@Component({
  moduleId: module.id,
  selector: 'app-menu',
  templateUrl: './menu.component.html', 
  
})
export class MenuComponent implements OnInit {
    @Input() device: number;
    @Input() mobileModeOn: boolean;
    @Output() deviceChange = new EventEmitter<number>();
    catId: number = 0;
    @Output() catIdChange = new EventEmitter<number>();
    
  categories: Cat[];
  constructor(private heroService: HeroService) {    
  }
  
  ngOnInit() :void {
    this.categories = this.heroService.getCategories(this.device === 3);
  }
  onSelectCat(id: number){
    this.catId = id;
    this.catIdChange.emit(id);
  }
  onSelectDevice(dev: number){    
    this.device = dev;
    this.deviceChange.emit(dev);
  }
  
  
}