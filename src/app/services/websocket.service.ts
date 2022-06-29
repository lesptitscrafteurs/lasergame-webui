import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { AlertService } from './alert.service';
import { ConfigService } from './config.service';

export enum MessageCmd {
  'HELLO' = 'HELLO',
  'GET_GAME' = 'GETGAME',
  'GAME' = 'GAME'
}

export enum HelloMessageParamsRole {
  'GUN' = 'GUN',
  'WEBUI' = 'WEBUI',
}

export class MessageParams { }

export class HelloMessageParams extends MessageParams {
  constructor (
    public role: HelloMessageParamsRole,
    public model: string,
    public color: string
  ) {
    super();
  }
}

export class Message {
  public static HelloMessage : Message = new Message (MessageCmd.HELLO, new HelloMessageParams(HelloMessageParamsRole.WEBUI, "", ""));
  public static GetGameMessage : Message = new Message (MessageCmd.GET_GAME, new MessageParams ());

  constructor (
    public cmd: string,
    public params: MessageParams
  ) { }
}

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private subject : ReplaySubject<Message> = new ReplaySubject<Message> ();
  private ws: WebSocket        ;
  private connected: boolean = false;
  
  constructor(
    private alertService: AlertService,
    private configService: ConfigService,
  ) {
    
  }

  public connect () : void {
    if (!this.connected) {
      this.ws = new WebSocket (this.configService.CONFIG.WS_URL);

      this.ws.onmessage = (event) => {
        const message : Message = JSON.parse(event.data);
        this.alertService.info(`<span class="text-muted">websocket.service.ts: </span>Nouveau message reçu de la part du serveur WebSocket : ${event.data}`);
        this.subject.next(message);
      }
  
      this.ws.onclose = () => {
        this.alertService.info (`<span class="text-muted">websocket.service.ts: </span>Connexion au serveur WebSocket fermée !`);
        this.connected = false;
      }
  
      this.ws.onerror = (error) => {
        this.alertService.danger (`<span class="text-muted">websocket.service.ts: </span>Erreur lors de la connection au serveur WebSocket à l'adresse [${this.configService.CONFIG.WS_URL}] !`, false);
        this.connected = false;
      }
  
      this.ws.onopen = (event) => {
        this.alertService.info (`<span class="text-muted">websocket.service.ts: </span>Connexion au serveur WebSocket établie. URL de connexion : ${this.configService.CONFIG.WS_URL}`);
        this.send( Message.HelloMessage );
        this.send( Message.GetGameMessage );
        this.connected = true;
      }
    }
  }

  public getMessage () : Observable<Message> {
    return this.subject.asObservable();
  }

  public isConnected () : boolean {
    return this.connected;
  }

  public send (message: Message) : void {
    this.alertService.info (`<span class="text-muted">websocket.service.ts: </span>Envoi du message sur websocket '${JSON.stringify(message)}'`)
    this.ws.send (JSON.stringify(message));
  }

  public close () : void {
    this.ws.close ();
  }
}
