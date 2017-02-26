import {Component, Input } from '@angular/core';
import { App } from './app';

@Component({
    selector: 'app-list',
    template : `
    <ng-container *ngFor="let app of apps">
    <app-detail [app]="app" ></app-detail> 
    </ng-container> 
    `
})

export class AppsComponent {
    @Input() apps: App[];
}