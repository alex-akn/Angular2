import {Component, Input } from '@angular/core';
import { App } from '../app';

@Component({
    moduleId: module.id,
    selector: 'top-chart',
    templateUrl : './top-chart.component.html',
})

export class TopChartComponent {
    @Input() apps: App[];
}