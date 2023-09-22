import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
} from '@ionic/angular';
import { Observable, map } from 'rxjs';

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

  records$: Observable<any>;

  user: any = {};

  constructor(
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public router: Router,
    public route: ActivatedRoute,
    public routerOutlet: IonRouterOutlet,
    public toastController: ToastController,
    private dataService: DataService,
    public credService: CredentialsService,
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

    const creds = this.credService.credentials;
    this.user = await this.dataService.getRecord('users', creds.profile._id);
    console.log(this.user);

    this.route.params.subscribe(async (p) => {
      console.log(p);
      // this.record = await this.dataService.records$('messages', p['id']);
      this.record = {
        contact: p['id'],
      };

      console.log(this.record);
      this.records$ = this.dataService
        .records$('messages', {
          // folder: this.segment,
          message_sent_to: this.user.assigned_phone_number,
          message_from: p['id'],
          $sort: {
            created: -1,
          },
        })
        .pipe(map((l: Paginated<any>) => l.data));

      this.records$.subscribe((r) => {
        console.log(r);
      });

      this.loading = false;
      this.loadingOverlay.dismiss();
    });
  }
}
