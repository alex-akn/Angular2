import {
    Component,
    OnInit,
    trigger,
    state,
    style,
    transition,
    animate
} from '@angular/core';
import { Router } from '@angular/router';
import { IntercomService } from './intercom.service';


@Component({
  moduleId: module.id,
  selector: 'navigation',
  templateUrl: 'nav-bar.component.html', 
  animations: [
    trigger('searchState', [
      state('collapsed', style({
        width : '0px',
        padding: '0px',
        display: 'none',        
      })),
      state('expanded',   style({             
        width: '*',
      })),
      transition('collapsed <=> expanded', animate('300ms ease-out')),     
    ])
  ]
})
export class NavBarComponent implements OnInit {
  searchState:string = 'expanded';
  mobileModeOn: boolean = false;
  title:string;
  constructor(
    private router: Router,
    private intercom: IntercomService
  ) { }
  ngOnInit() :void {
    this.intercom.newTitle$.subscribe(title => this.title = title)
    let that = this;
    window.addEventListener("resize", function() {that.onResize()});
    this.onResize();    
  }
  onEngageSearch(str: string): void {
    if(str.length >= 3 ){
      let link = ['/search', 'deals', str ];
      this.router.navigate(link);
    }
    if(!this.mobileModeOn) { return; }
    if(this.searchState === 'collapsed') { this.searchState = 'expanded'; }
    else { this.searchState = 'collapsed'; }
  }
  search(str: string):void{
    if(str.length >= 3 ){
      let link = ['/search', 'deals', str ];
      this.router.navigate(link);
    }
  }
  onResize(){    
    let w = window.innerWidth;
    this.intercom.inform(w);
    if(w < 992 && !this.mobileModeOn) {
      this.mobileModeOn = true;      
      this.searchState = 'collapsed';
    }
    if(w >= 992 && this.mobileModeOn) {
      this.mobileModeOn = false;      
      this.searchState = 'expanded';
    }
  }
}

