import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '@app/@shared/services/data.service';
import { Paginated } from '@feathersjs/feathers';
import {
  AlertController,
  Config,
  IonRouterOutlet,
  LoadingController,
  ModalController,
  ToastController,
  IonModal,
} from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
})
export class ClientsComponent implements OnInit {
  // @ts-ignore
  @ViewChild(IonModal) modal: IonModal;

  ios: boolean = false;
  dayIndex: number = 0;
  queryText: string = '';
  segment: string = 'all';
  excludeTracks: any = [];
  shownSessions: any = [];
  groups: any = [];
  confDate: string = '';
  showSearchbar: boolean = false;
  loading: boolean = true;

  loadingOverlay: any = null;

  records$: Observable<any>;

  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name: string;

  constructor(
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public router: Router,
    public routerOutlet: IonRouterOutlet,
    public toastCtrl: ToastController,
    private dataService: DataService,
    public config: Config
  ) {}

  ngOnInit(): void {
    this.ios = this.config.get('mode') === 'ios';

    this.updateList();
  }

  async getData(limit: any, skip: any) {
    const response = await this.dataService.findRecords('clients', { $limit: limit, $skip: skip });
    return response;
  }

  async updateList() {
    this.loading = true;
    // this.records = [];
    this.loadingOverlay = await this.loadingCtrl.create();
    await this.loadingOverlay.present();

    this.records$ = this.dataService
      .records$('clients', {
        $sort: {
          last_name: 1,
        },
      })
      .pipe(map((l: Paginated<any>) => l.data));

    this.records$.subscribe(async () => {
      this.loadingOverlay.dismiss();
      this.loading = false;
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

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }
}
