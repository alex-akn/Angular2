import { animate, AnimationEntryMetadata, state, style, transition, trigger } from '@angular/core';

export const showMenuAnimation: AnimationEntryMetadata =
    trigger('showMenu', [
      state('inactive', style({        
        display: 'none',        
        transform: 'translateX(-100%)'       
      })),
      state('active',   style({ 
        display: 'block',         
        transform: 'translateX(0)'
      })),
      state('opened', style({        
        transform: 'translateZ(0)',        
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
        }))
      ]),
      transition('opened <=> inactive', [
        animate('400ms')
      ]),
    ]);
export const hideMenuFullAnimation: AnimationEntryMetadata =
    trigger('hideMenu', [
      state('inactive', style({ 
        display: 'none',  
        transform: 'translateX(100%)'
      })),
      state('active',   style({        
        display: 'block',         
        transform: 'translateX(0)'
      })),
      /*state('indented',   style({        
        display: 'block',        
        left:'200px',
        transform: 'translateX(200px)'
      })),*/
      transition('inactive => active', [
        style({
          position:'absolute',          
          display:'block',
          top:'0px',          
          transform: 'translateX(100%)'
        }), animate('400ms')]),
      /*transition('indented => active', [
        style({
          position:'absolute',          
          display:'block',
          top:'0px'      
        }), animate('400ms')]),*/
      transition('active => inactive', [
        animate('400ms', style({
          transform: 'translateX(100%)',         
        }))
      ])     
    ]);

