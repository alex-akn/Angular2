import { Injectable } from '@angular/core';
import {Headers, Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';

import { App } from './app';
import { Cat } from './cat';
import { CATEGORIES } from './categories';

@Injectable()
export class HeroService{
    private thatUrl = 'http://appstor.news/getApps.php';
    constructor(private http: Http) {}
    getMoreApps(action: string, offset: number, limit: number, genre: number, price: number, device: number): Promise<App[]> {
        let params = `?action=${action}&offset=${offset}&limit=${limit}&genre=${genre}&price=${price}&device=${device}`;
        return this.http.get(this.thatUrl+params)
        .toPromise()
        .then(response => { console.log(response.json().message);
            return response.json().results as App[];})
        .catch(this.handleError);
    }
    getCategories(isMac: boolean): Cat[]{
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

    fetchData(params:any): Promise<any> {
        let paramString="?";
        if (Array.isArray(params)) {            
            paramString = `params=${params.toString()}`;//not implemented yet            
        } else {
            for (var key in params) {
                let ampersand = paramString === "?" ? "" : "&";
                paramString = `${paramString}${ampersand}${key}=${params[key]}`;
            }
        }
        return this.http.get(this.thatUrl+paramString)
        .toPromise()
        .then(response => { console.log(response.json().message);
            return response.json() || { }; })
        .catch(this.handleError);
    }

    private handleError (error: Response | any) {    
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}