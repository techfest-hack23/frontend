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
} from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
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

  categories: any = ['Housing', 'Employment', 'Addiction', 'Documents', 'Other'];

  loadingOverlay: any = null;

  records$: Observable<any>;

  record: any = {};

  user: any = {};

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
    private credService: CredentialsService,
    public config: Config
  ) {}

  ngOnInit(): void {
    this.ios = this.config.get('mode') === 'ios';

    this.updateList();
  }

  async updateList() {
    this.loading = true;
    // this.records = [];
    this.loadingOverlay = await this.loadingCtrl.create();
    await this.loadingOverlay.present();

    const creds = this.credService.credentials;
    this.user = await this.dataService.getRecord('users', creds.profile._id);

    this.records$ = this.dataService
      .records$('tasks', {
        assigned_user: this.user._id,
        $sort: {
          created: -1,
        },
      })
      .pipe(map((l: Paginated<any>) => l.data));

    this.records$.subscribe(async (clients) => {
      console.log(clients);
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

  async create() {
    this.modal.dismiss(this.name, 'confirm');
    this.record['assigned_user'] = this.user._id;
    await this.dataService.createRecord('tasks', this.record);
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }
}
