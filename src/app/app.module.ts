import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

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
            if (x.status !== 404) alert.danger (`<span class="text-muted">app.module.ts : </span>Error lors du chargement du fichier de configuration ! Vérifiez que le fichier soit valide...`);
            else alert.danger (`<span class="text-muted">app.module.ts : </span>Fichier de configuration introuvable !`, true, 5000);
            alert.warning (`<span class="text-muted">app.module.ts : </span>Utilisation des valeurs de configuration par défaut...`, true, 5000);
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
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
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
