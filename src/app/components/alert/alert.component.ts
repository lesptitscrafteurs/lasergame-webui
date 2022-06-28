import { Component, OnInit } from '@angular/core';
import { Alert, AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
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
