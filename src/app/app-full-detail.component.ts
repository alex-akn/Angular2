import {Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { HeroService } from './hero.service';

import { App } from './app';

import 'rxjs/add/operator/switchMap';

@Component({
    moduleId: module.id,
    selector: 'app-full-detail',
    templateUrl: './app-full-detail.component.html'
})

export class AppFullDetailComponent implements OnInit{
    app: App;
    constructor(
        private heroService: HeroService,
        private route: ActivatedRoute,
        private location: Location
    ) {}
    ngOnInit(): void {
        this.route.url.subscribe(url => console.log(url[0].path));
        console.log('init');
        this.route.params
        .switchMap((params: Params) =>
        this.heroService.fetchData({'action':'byid', 'id':params['id']}))
        .subscribe(response => this.app = response.results as App);
    }
    goBack(): void {
        this.location.back();
    }
}