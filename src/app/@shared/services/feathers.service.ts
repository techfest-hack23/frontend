import { Injectable } from '@angular/core';

import * as feathersRx from 'feathers-reactive';
import * as io from 'socket.io-client';

import feathers from '@feathersjs/feathers';
import feathersSocketIOClient from '@feathersjs/socketio-client';
import feathersAuthClient2 from '@feathersjs/authentication-client';

/**
 * Simple wrapper for feathers
 */
@Injectable()
export class Feathers {
  private _feathers = feathers(); // init socket.io
  private _socket = io(`http://${window.location.hostname}:3030`);

  private feathersAuthClient = require('@feathersjs/authentication-client').default;

  constructor() {
    console.log(window.location);
    this._feathers
      .configure(
        feathersSocketIOClient(this._socket, {
          timeout: 200000,
        })
      ) // add socket.io plugin
      .configure(
        this.feathersAuthClient({
          // add authentication plugin
          storage: window.localStorage,
        })
      )
      .configure(
        feathersRx({
          // add feathers-reactive plugin
          idField: '_id',
        })
      );
  }

  // expose services
  public service(name: string) {
    return this._feathers.service(name);
  }

  // expose authentication
  public authenticate(credentials?: any): Promise<any> {
    return this._feathers.authenticate(credentials);
  }

  public reAuth(): Promise<any> {
    return this._feathers.reAuthenticate();
  }

  // expose logout
  public logout() {
    return this._feathers.logout();
  }

  // public set() {
  //   return this._feathers.set
  // }
}
