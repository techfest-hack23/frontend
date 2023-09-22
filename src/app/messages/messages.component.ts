import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '@app/@shared/services/data.service';
import { CredentialsService } from '@app/auth';
import { Paginated } from '@feathersjs/feathers';
import {
  AlertController,
  Config,
  IonRouterOutlet,
  LoadingController,
  ModalController,
  ToastController,
  IonModal,
  IonList,
} from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit {
  // // Gets a reference to the list element
  @ViewChild('scheduleList', { static: true }) scheduleList: IonList;

  @ViewChild(IonModal) modal: IonModal;

  ios: boolean = false;
  dayIndex: number = 0;
  queryText: string = '';
  segment: string = 'inbox';
  excludeTracks: any = [];
  shownSessions: any = [];
  groups: any = [];
  confDate: string = '';
  showSearchbar: boolean = false;
  loading: boolean = true;

  loadingOverlay: any = null;

  records$: Observable<any>;

  messageGroups: any = [];

  record: any = {};

  user: any = {};

  constructor(
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public router: Router,
    public routerOutlet: IonRouterOutlet,
    public toastCtrl: ToastController,
    public dataService: DataService,
    public credService: CredentialsService,
    public config: Config
  ) {}

  async ngOnInit() {
    this.ios = this.config.get('mode') === 'ios';
    // await this.getData();

    await this.updateList();
  }

  async groupByKey(array, key) {
    return array.reduce((hash, obj) => {
      if (obj[key] === undefined) return hash;
      const groupped = Object.assign(hash, { [obj[key]]: (hash[obj[key]] || []).concat(obj) });
      return groupped;
    }, {});
  }

  async updateList() {
    this.loading = true;
    // this.records = [];
    this.loadingOverlay = await this.loadingCtrl.create();
    await this.loadingOverlay.present();

    const creds = this.credService.credentials;
    this.user = await this.dataService.getRecord('users', creds.profile._id);
    console.log(this.user);

    this.records$ = this.dataService
      .records$('messages', {
        folder: this.segment,
        message_sent_to: this.user.assigned_phone_number,
      })
      .pipe(map((l: Paginated<any>) => l.data));

    this.records$.subscribe(async (messages) => {
      const grouped = await this.groupByKey(messages, 'message_from');
      const grouppedKeys = Object.keys(grouped);
      let allGroups = [];
      for (let k of grouppedKeys) {
        console.log(k);
        let newGroup = {
          contact: k,
          messages: grouped[k],
        };

        this.messageGroups.push(newGroup);
      }
      console.log(this.messageGroups);
    });
  }
  presentFilter() {}
  addFavorite(item: any, session: any) {}
  removeFavorite(item: any, session: any, action: any) {}

  presentAddParticipant() {}
  openSocial(service: any, fab: any) {}

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  async create() {
    // this.modal.dismiss(this.name, 'confirm');
    // await this.dataService.createRecord('users', this.record);
  }

  onWillDismiss(event: Event) {
    // const ev = event as CustomEvent<OverlayEventDetail<string>>;
    // if (ev.detail.role === 'confirm') {
    //   this.message = `Hello, ${ev.detail.data}!`;
    // }
  }
}
