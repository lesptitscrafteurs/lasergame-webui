import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { catchError, map, Observable, ObservableInput, of } from 'rxjs';
import { ConfigService } from './services/config.service';

function load (httpClient: HttpClient, config: ConfigService) : (() => Promise<boolean>) {
  return () : Promise<boolean> => {
    return new Promise<boolean>((resolve: (a: boolean) => void) : void => {
      httpClient.get('./assets/config.json')
        .pipe(
          map((x: Object) => {
            config.CONFIG = JSON.parse(JSON.stringify(x));
            resolve(true);
          }),
          catchError((x: { status: number }, caught: Observable<void>): ObservableInput<{}> => {
            if (x.status !== 404) {
              console.error ("Fichier de configuration introuvable !");
              resolve(false);
            }
            console.error ("Error lors du chargement du fichier de configuration ! Utilisation des valeurs par défaut.");
            resolve(true);
            return of({});
          })
        ).subscribe();
    });
  };
}


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TooltipModule.forRoot(),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: load,
      multi: true,
      deps: [
        HttpClient,
        ConfigService,
      ],
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
