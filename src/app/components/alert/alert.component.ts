import { animate, sequence, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Alert, AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  animations: [
    trigger('anim', [
      transition('* => void', [
        style({ height: '*', opacity: '1', transform: 'translateX(0)' }),
        sequence ([
          animate(".25s ease", style({ height: '*', opacity: '.2', transform: 'translateX(200%) '})),
          animate(".1s ease", style({ height: '0', opacity: '0', transform: 'translateX(200%) '})),
        ])
      ]),
      transition('void => active', [
        style({ height: '0', opacity: '0', transform: 'translateX(200%)' }),
        sequence ([
          animate(".1s ease", style({ height: '*', opacity: '.2', transform: 'translateX(200%) '})),
          animate(".35s ease", style({ height: '*', opacity: '1', transform: 'translateX(0) '})),
        ])
      ]),
    ])
  ]
})
export class AlertComponent implements OnInit {
  alerts : Alert [] = [];

  constructor(private alertService : AlertService) { }

  ngOnInit(): void {
    this.alertService.getAlerts().subscribe (
      (alert: Alert) => {
        if (AlertService.level(alert.getType()) < 2) {
          this.alerts.push (alert);
          if (alert.getTimer() != -1) setTimeout( () => this.close(alert), alert.getTimer());
        }
      }
    )
  }

  close (alert: Alert) : void {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }
}
