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

  cabins: any = [];
  cabinCount: number = 40;

  providers: any = [];

  smsNumbers = ['+14252426798', '+13022401194', '+13023033884'];

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

    while (this.cabins.length < this.cabinCount) {
      // this.cabinCount ++;
      let cabinNum = this.cabins.length + 1;
      let cabin = `Cabin #${cabinNum}`;
      this.cabins.push(cabin);
    }

    this.getData();
  }

  async getData() {
    this.loading = true;
    this.record = {};
    this.loadingOverlay = await this.loadingCtrl.create();
    await this.loadingOverlay.present();

    this.providers = await this.dataService.findRecords('users', { is_provider: true });
    this.providers = this.providers.data;
    this.route.params.subscribe(async (p) => {
      console.log(p);
      this.record = await this.dataService.getRecord('users', p['id']);

      // let query = await this.dataService.findRecords('users', {
      //   _id: p['id']
      // });
      // console.log(query)

      console.log(this.record);
      this.loading = false;
      this.loadingOverlay.dismiss();
    });
  }

  async selectChange() {
    try {
      await this.dataService.updateRecord('users', this.record._id, this.record);
    } catch (e) {
      const toast = await this.toastController.create({
        message: 'Error saving changes',
        duration: 3000,
        color: 'danger',
        position: 'bottom',
      });

      await toast.present();
    }
  }

  async saveRecord() {
    try {
      await this.dataService.updateRecord('users', this.record._id, this.record);
      const toast = await this.toastController.create({
        message: 'Changes Saved',
        duration: 1500,
        color: 'success',
        position: 'bottom',
      });

      await toast.present();
    } catch (e) {
      const toast = await this.toastController.create({
        message: 'Error saving changes',
        duration: 3000,
        color: 'danger',
        position: 'bottom',
      });

      await toast.present();
    }
  }

  presentFilter() {}
  addFavorite(item: any, session: any) {}
  removeFavorite(item: any, session: any, action: any) {}
  openSocial(service: any, fab: any) {}
}
