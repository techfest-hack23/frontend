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
  selector: 'app-message-details',
  templateUrl: './message-details.component.html',
  styleUrls: ['./message-details.component.scss'],
})
export class MessageDetailsComponent implements OnInit {
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
    public toastController: ToastController,
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
      this.record = await this.dataService.getRecord('messages', p['id']);

      // let query = await this.dataService.findRecords('users', {
      //   _id: p['id']
      // });
      // console.log(query)

      console.log(this.record);
      this.loading = false;
      this.loadingOverlay.dismiss();
    });
  }
}
