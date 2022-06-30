import { Injectable } from '@angular/core';


export class Config {
  constructor (
    public WS_URL : string = "ws://127.0.0.1:8000",
    public API_URL : string = "ws://127.0.0.1:5000",
  ) { }
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  public CONFIG : Config = new Config ();

  constructor() { }
}
