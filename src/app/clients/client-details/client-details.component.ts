import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '@app/@shared/services/data.service';
import {
  AlertController,
  Config,
  IonRouterOutlet,
  LoadingController,
  ModalController,
  ToastController,
} from '@ionic/angular';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss'],
})
export class ClientDetailsComponent implements OnInit {
  // @ts-ignore
  @ViewChild('scheduleList', { static: true }) scheduleList: IonList;

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

  record: any = {};

  constructor(
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public router: Router,
    public route: ActivatedRoute,
    public routerOutlet: IonRouterOutlet,
    public toastCtrl: ToastController,
    private dataService: DataService,
    public config: Config
  ) {}

  ngOnInit(): void {
    this.ios = this.config.get('mode') === 'ios';

    this.getData();
  }

  async getData() {
    this.loading = true;
    this.record = {};
    this.loadingOverlay = await this.loadingCtrl.create();
    await this.loadingOverlay.present();

    this.route.params.subscribe(async (p) => {
      console.log(p);
      this.record = await this.dataService.getRecord('clients', p['id']);

      console.log(this.record);
      this.loading = false;
      this.loadingOverlay.dismiss();
    });
  }

  presentFilter() {}
  addFavorite(item: any, session: any) {}
  removeFavorite(item: any, session: any, action: any) {}
  openSocial(service: any, fab: any) {}
}
