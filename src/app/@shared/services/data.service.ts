import { Injectable } from '@angular/core';
import { Feathers } from './feathers.service';

/**
 *  Abstraction layer for data management
 *  Technically this isn't needed for feathers-chat,
 *  but you will need it for more complex tasks.
 */
@Injectable()
export class DataService {
  constructor(private feathers: Feathers) {}

  messages$() {
    // just returning the observable will query the backend on every subscription
    // using some caching mechanism would be wise in more complex applications
    return this.feathers // todo: remove 'any' assertion when feathers-reactive typings are up-to-date with buzzard
      .service('messages')
      .watch()
      .find({
        query: {
          $sort: { createdAt: -1 },
          $limit: 25,
        },
      });
  }

  users$() {
    // just returning the observable will query the backend on every subscription
    // using some caching mechanism would be wise in more complex applications
    return (<any>this.feathers // todo: remove 'any' assertion when feathers-reactive typings are up-to-date with buzzard
      .service('users'))
      .watch()
      .find();
  }

  directReports$() {
    return (<any>this.feathers.service('ad/direct-reports')).find();
  }

  authLogs$(query) {
    this.feathers.service('duo-auth').timeout;
    return (<any>this.feathers.service('duo-auth')).find({
      query,
    });
  }

  vmwVM(name) {
    return (<any>this.feathers.service('vmware-vm')).watch().get(name);
  }

  records$(table, query) {
    let fullQuery = {
      query: {
        $limit: 1000,
      },
    };
    return (<any>this.feathers.service(table)).watch().find({
      query,
    });
  }

  findRecords(table, query) {
    return (<any>this.feathers.service(table)).find({
      query,
    });
  }

  record$(table, id) {
    console.log(id);
    return (<any>this.feathers.service(table)).watch().get(id);
  }

  getRecord(table, id) {
    return (<any>this.feathers.service(table)).get(id);
  }

  userGroups$(userId) {
    // just returning the observable will query the backend on every subscription
    // using some caching mechanism would be wise in more complex applications
    return (<any>this.feathers // todo: remove 'any' assertion when feathers-reactive typings are up-to-date with buzzard
      .service('user_groups'))
      .watch()
      .find({
        query: {
          user_id: userId,
        },
      });
  }

  userRoles$(userId) {
    // just returning the observable will query the backend on every subscription
    // using some caching mechanism would be wise in more complex applications
    return (<any>this.feathers // todo: remove 'any' assertion when feathers-reactive typings are up-to-date with buzzard
      .service('user_roles'))
      .watch()
      .find({
        query: {
          user_id: userId,
        },
      });
  }

  createGroup(data) {
    // feathers-reactive Observables are hot by default,
    // so we don't need to subscribe to make create() happen.
    this.feathers.service('user-groups').create(data);
  }

  createRecord(table: any, data: any) {
    return <any>this.feathers.service(table).create(data);
  }

  // createGuacSession(data) {
  //   return (<any>this.feathers
  //     .service('guac-session')
  //     .create(data))
  // }

  updateRecord(table: any, id: any, data: any) {
    return <any>this.feathers.service(table).patch(id, data);
  }

  deleteRecord(table: any, id: any, data: any) {
    let recordData = {
      table,
      data,
    };
    // backup the record
    // this.feathers
    //   .service('record-deletions')
    //   .create(recordData)

    // delete the record
    return <any>this.feathers.service(table).remove(id);
  }

  checkSetup() {
    return <any>this.feathers.service('system').find();
  }

  sendMessage(message: string) {
    if (message === '') {
      return;
    }

    // feathers-reactive Observables are hot by default,
    // so we don't need to subscribe to make create() happen.
    this.feathers.service('messages').create({
      text: message,
    });
  }
}
