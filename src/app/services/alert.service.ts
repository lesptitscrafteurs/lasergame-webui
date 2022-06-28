import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

export enum AlertType {
  success = 'success',
  info = 'info',
  warning = 'warning',
  danger = 'danger',
  primary = 'primary',
  secondary = 'secondary',
  light = 'light',
  dark = 'dark'
}

export class Alert {
  constructor (
    private type : AlertType = AlertType.info,
    private dismissible : boolean = true,
    private message : string,
    private timer : number = -1
  ) { }

  public  getType () : AlertType { return this.type; }
  public  isDismissible () : boolean { return this.dismissible; }
  public  getMessage () : string { return this.message; }
  public  getTimer () : number { return this.timer; }
}

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private stack : ReplaySubject<Alert> = new ReplaySubject<Alert> ();

  constructor() { }

  public publish (alert: Alert) : void {
    this.stack.next (alert);
  }

  public success (content : string, dismissible : boolean = true, timer : number = -1) : void {
    this.publish (
      new Alert (
        AlertType.success,
        dismissible,
        content,
        timer
      )
    );
  }

  public info (content : string, dismissible : boolean = true, timer : number = -1) : void {
    this.publish (
      new Alert (
        AlertType.info,
        dismissible,
        content,
        timer
      )
    );
  }

  public warning (content : string, dismissible : boolean = true, timer : number = -1) : void {
    this.publish (
      new Alert (
        AlertType.warning,
        dismissible,
        content,
        timer
      )
    );
  }

  public danger (content : string, dismissible : boolean = true, timer : number = -1) : void {
    this.publish (
      new Alert (
        AlertType.danger,
        dismissible,
        content,
        timer
      )
    );
  }

  public primary (content : string, dismissible : boolean = true, timer : number = -1) : void {
    this.publish (
      new Alert (
        AlertType.primary,
        dismissible,
        content,
        timer
      )
    );
  }

  public secondary (content : string, dismissible : boolean = true, timer : number = -1) : void {
    this.publish (
      new Alert (
        AlertType.secondary,
        dismissible,
        content,
        timer
      )
    );
  }

  public light (content : string, dismissible : boolean = true, timer : number = -1) : void {
    this.publish (
      new Alert (
        AlertType.light,
        dismissible,
        content,
        timer
      )
    );
  }

  public dark (content : string, dismissible : boolean = true, timer : number = -1) : void {
    this.publish (
      new Alert (
        AlertType.dark,
        dismissible,
        content,
        timer
      )
    );
  }

  public getAlerts () : ReplaySubject<Alert> {
    return this.stack;
  }

  public static level (type: AlertType) : number {
    switch (type) {
      case AlertType.danger :
      case AlertType.success :
      case AlertType.warning :
        return 1;
        break;
      case AlertType.info :
        return 2;
        break;
      default :
        return 3;
    }
  }
}
