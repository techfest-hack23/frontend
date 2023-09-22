import { Component, OnInit } from '@angular/core';
import { DataService } from '@app/@shared/services/data.service';
import { CredentialsService } from '@app/auth';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home-personal-information',
  templateUrl: './home-personal-information.component.html',
  styleUrls: ['./home-personal-information.component.scss'],
})
export class HomePersonalInformationComponent implements OnInit {
  record: any = {};
  loading: boolean = false;
  loadingOverlay: any = null;
  constructor(
    private dataService: DataService,
    private credService: CredentialsService,
    public loadingCtrl: LoadingController
  ) {}

  async ngOnInit() {
    this.loading = true;
    this.record = {};
    this.loadingOverlay = await this.loadingCtrl.create();
    await this.loadingOverlay.present();

    const creds = this.credService.credentials;
    this.record = await this.dataService.getRecord('users', creds.profile._id);

    console.log(this.record);

    this.loadingOverlay.dismiss();
    this.loading = false;
  }
}
