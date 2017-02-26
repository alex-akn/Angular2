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
        this.route.params
        .switchMap((params: Params) => this.heroService.getApp(+params['id']))
        .subscribe(app => this.app = app);
    }
    goBack(): void {
        this.location.back();
    }
}