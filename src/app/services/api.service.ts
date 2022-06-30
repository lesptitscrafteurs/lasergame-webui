import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ConfigService } from './config.service';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor (
    private http: HttpClient,
    private config: ConfigService,
    private alert: AlertService
  ) { }

  get(url: string) : Observable<any> {
    this.alert.info (`<span class="text-muted">api.service.ts: </span>envoie d'une requête au serveur http :`);
    this.alert.info (`                méthode : GET`);
    this.alert.info (`                URL : ${this.config.CONFIG.API_URL}/${url}`);
    return this.http.get<any>(`${this.config.CONFIG.API_URL}/${url}`);
  }

  post(url: string, data: any) : Observable<any> {
    this.alert.info (`<span class="text-muted">api.service.ts: </span>envoie d'une requête au serveur http :`);
    this.alert.info (`                méthode : POST`);
    this.alert.info (`                URL : ${this.config.CONFIG.API_URL}/${url}`);
    this.alert.info (`                données : ${JSON.stringify(data)}`);
    return this.http.post<any>(`${this.config.CONFIG.API_URL}/${url}`, data);
  }
}
