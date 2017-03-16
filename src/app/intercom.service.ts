import { Injectable } from '@angular/core';
import { BehaviorSubject }    from 'rxjs/BehaviorSubject';

@Injectable()
export class IntercomService {  
  //BehaviorSubject is used because otherwise subscribers wont 
  // receive the initial value
  //it must be initialized with navbar's default mobileModeOn value
  // (wich is false)
  private modeToggledSource = new BehaviorSubject<number>(1679);

  private titleSource = new BehaviorSubject<string>('No title');
  
  modeToggled$ = this.modeToggledSource;
  newTitle$ = this.titleSource;
 
  inform(width: number) {   
    this.modeToggledSource.next(width);
  }
  setNewTitle(title: string) {   
    this.titleSource.next(title);
  } 
}