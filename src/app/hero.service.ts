import { Injectable } from '@angular/core';
import {Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { App } from './app';
import { Cat } from './cat';
import { CATEGORIES } from './categories';

@Injectable()
export class HeroService{
    private thatUrl = 'http://appstor.news/getApps.php';
    constructor(private http: Http) {}
    getMoreApps(action: string, offset: number, limit: number, genre: number, price: number): Promise<App[]> {
        let params = `?action=${action}&offset=${offset}&limit=${limit}&genre=${genre}&price=${price}`;
        return this.http.get(this.thatUrl+params)
        .toPromise()
        .then(response => { console.log(response.json().message);
            return response.json().results as App[];})
        .catch(this.handleError);
    }
    getCategories(): Cat[]{
        return CATEGORIES;
    }
    getApp(id: number): Promise<App> {
        let params = `?action=byid&id=${id}`;
        return this.http.get(this.thatUrl+params)
        .toPromise()
        .then(response => { console.log(response.json().message);
            return response.json().results as App;})
        .catch(this.handleError);
    }
    private handleError(error: any): Promise<any>  {
        console.error('An error ocuured', error);
        return Promise.reject(error.message || error);
    }
}