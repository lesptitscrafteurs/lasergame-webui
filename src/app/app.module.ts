import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AlertModule } from 'ngx-bootstrap/alert';
import { catchError, map, Observable, ObservableInput, of } from 'rxjs';
import { ConfigService } from './services/config.service';
import { AlertService } from './services/alert.service';
import { AlertComponent } from './components/alert/alert.component';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';

function load (httpClient: HttpClient, config: ConfigService, alert: AlertService) : (() => Promise<boolean>) {
  return () : Promise<boolean> => {
    return new Promise<boolean>((resolve: (a: boolean) => void) : void => {
      httpClient.get('./assets/config.json')
        .pipe(
          map((x: Object) => {
            config.CONFIG = JSON.parse(JSON.stringify(x));
            resolve(true);
          }),
          catchError((x: { status: number }, caught: Observable<void>): ObservableInput<{}> => {
            if (x.status !== 404) alert.danger ("Error lors du chargement du fichier de configuration ! Vérifiez que le fichier soit valide...", false);
            else alert.danger ("Fichier de configuration introuvable !");
            alert.warning (" Utilisation des valeurs de configuration par défaut...");
            resolve(true);
            return of({});
          })
        ).subscribe();
    });
  };
}


@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    SafeHtmlPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AlertModule.forRoot(),
  ],
  providers: [
    AlertService,
    {
      provide: APP_INITIALIZER,
      useFactory: load,
      multi: true,
      deps: [
        HttpClient,
        ConfigService,
        AlertService,
      ],
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
