import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController, LoadingController, Platform } from '@ionic/angular';
import { ActionSheetButton, ActionSheetOptions, TextFieldTypes } from '@ionic/core';
import { TranslateService } from '@ngx-translate/core';

import { I18nService } from '@app/i18n';
import { AuthenticationService, CredentialsService } from '@app/auth';
import { DataService } from '@app/@shared/services/data.service';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
})
export class ShellComponent implements OnInit {
  isLoading: boolean = false;
  loadingOverlay: any = null;
  impersonating: boolean = false;
  authenticated_user: any = {};
  current_participant: any = {};
  current_user: any = {};
  participants: any = [];
  showParticipantMenu: boolean = false;

  constructor(
    private router: Router,
    private translateService: TranslateService,
    private platform: Platform,
    private alertController: AlertController,
    private actionSheetController: ActionSheetController,
    private authenticationService: AuthenticationService,
    private credentialsService: CredentialsService,
    private loadingController: LoadingController,
    private dataService: DataService,
    private i18nService: I18nService
  ) {}

  async ngOnInit() {
    this.isLoading = true;
    this.loadingOverlay = await this.loadingController.create();
    await this.loadingOverlay.present();

    const credentials = this.credentialsService.credentials;
    // console.log(credentials)
    this.current_user = credentials;
    this.authenticated_user = credentials;
    await this.loadingOverlay.dismiss();
    this.isLoading = false;
  }

  async showProfileActions() {
    let createdActionSheet: any;
    const buttons: ActionSheetButton[] = [
      {
        text: this.translateService.instant('Logout'),
        icon: this.platform.is('ios') ? undefined : 'log-out',
        role: 'destructive',
        handler: () => this.logout(),
      },
      // {
      //   text: this.translateService.instant('Impersonate Participant'),
      //   icon: this.platform.is('ios') ? undefined : 'person-circle-outline',
      //   role: 'destructive',
      //   handler: () => this.impersonateParticipant(),
      // },
      {
        text: this.translateService.instant('Change language'),
        icon: this.platform.is('ios') ? undefined : 'globe',
        handler: async () => {
          // Wait for action sheet dismiss animation to finish, see "Dismissing And Async Navigation" section in:
          // http://ionicframework.com/docs/api/components/action-sheet/ActionSheetController/#advanced
          await createdActionSheet.dismiss();
          this.changeLanguage();
          return false;
        },
      },
      {
        text: this.translateService.instant('Cancel'),
        icon: this.platform.is('ios') ? undefined : 'close',
        role: 'cancel',
      },
    ];

    // On Cordova platform language is set to the device language
    if (this.platform.is('cordova')) {
      buttons.splice(1, 1);
    }

    const actionSheetOptions: ActionSheetOptions = {
      header: this.username || undefined,
      buttons,
    };

    createdActionSheet = await this.actionSheetController.create(actionSheetOptions);
    await createdActionSheet.present();
  }

  get username(): string | null {
    const credentials = this.credentialsService.credentials;
    return credentials ? credentials.username : null;
  }

  private logout() {
    this.authenticationService.logout().subscribe(() => this.router.navigate(['/login'], { replaceUrl: true }));
  }

  get isWeb(): boolean {
    return !this.platform.is('cordova');
  }

  private async impersonateParticipant() {
    // this.isLoading = true;
    this.loadingOverlay = await this.loadingController.create();
    await this.loadingOverlay.present();
    const query = await this.dataService.findRecords('participants', {});
    this.participants = query.data;

    await this.loadingOverlay.dismiss();

    const alertController = await this.alertController.create({
      header: this.translateService.instant('Impersonate Participant'),
      inputs: this.participants.map((p) => ({
        type: 'radio' as TextFieldTypes,
        name: p.nick_name,
        label: p.nick_name,
        value: p,
        checked: null,
      })),
      buttons: [
        {
          text: this.translateService.instant('Cancel'),
          role: 'cancel',
        },
        {
          text: this.translateService.instant('Ok'),
          handler: (selectedParticipant) => {
            console.log(selectedParticipant);
            if (selectedParticipant._id) {
              this.showParticipantMenu = true;
              this.current_participant = selectedParticipant;
              this.impersonating = true;
            }
          },
        },
      ],
    });
    await alertController.present();
  }

  private async changeLanguage() {
    const alertController = await this.alertController.create({
      header: this.translateService.instant('Change language'),
      inputs: this.i18nService.supportedLanguages.map((language) => ({
        type: 'radio' as TextFieldTypes,
        name: language,
        label: language,
        value: language,
        checked: language === this.i18nService.language,
      })),
      buttons: [
        {
          text: this.translateService.instant('Cancel'),
          role: 'cancel',
        },
        {
          text: this.translateService.instant('Ok'),
          handler: (language) => {
            this.i18nService.language = language;
          },
        },
      ],
    });
    await alertController.present();
  }
}
