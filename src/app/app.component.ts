import { Component } from '@angular/core';
@Component({
  selector: 'my-app',
  template: `    
<nav class="navbar navbar-default">
  <div class="container">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="#">{{title}}</a>
    </div>    
    <div class="collapse navbar-collapse">
      <ul class="nav navbar-nav">
        <li routerLinkActive="active"><a routerLink="/deals">Скидки iOS</a></li>
        <li routerLinkActive="active"><a routerLink="/deals-mac">Скидки Mac</a></li>
        <li routerLinkActive="active"><a routerLink="/top-apps">Топ Apps</a></li>
        <li routerLinkActive="active"><a routerLink="/newest-apps">Новое</a></li>
      </ul>
      <form class="navbar-form navbar-right">
        <div class="form-group">
          <input type="text" class="form-control" placeholder="{{comp}}">
        </div>
        <button type="submit" class="btn btn-default">Submit</button>
      </form>      
    </div>
  </div>
</nav>
<div class="container">  
  <router-outlet #comp></router-outlet>
</div>
  `
})
export class AppComponent {
  title = 'App Store News';
}
