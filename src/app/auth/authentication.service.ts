import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Credentials, CredentialsService } from './credentials.service';
import { AuthService } from '@app/@shared/services/auth.service';
import { DataService } from '@app/@shared/services/data.service';

export interface LoginContext {
  username: string;
  password: string;
  remember?: boolean;
}

/**
 * Provides a base for authentication workflow.
 * The login/logout methods should be replaced with proper implementation.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    private credentialsService: CredentialsService,
    private authService: AuthService,
    private dataService: DataService
  ) {}

  /**
   * Authenticates the user.
   * @param context The login parameters.
   * @return The user credentials.
   */
  login(context: LoginContext): Promise<any> {
    // Replace by proper authentication call
    const data = {
      username: context.username,
      profile: {},
      roles: [],
      groups: [],
      token: '123456',
    };

    const credentials = {
      email: context.username,
      password: context.password,
      strategy: 'local',
    };

    return new Promise((resolve: any) => {
      this.authService
        .logIn(credentials)
        .then(async (creds) => {
          data.profile = creds.user;
          data.token = creds.accessToken;

          // const roles = await this.dataService.findRecords('user_roles', { user_id: creds.user.id });
          // const groups = await this.dataService.findRecords('user_groups', { user_id: creds.user.id });
          // data.roles = roles.data;
          // data.groups = groups.data;
          this.credentialsService.setCredentials(data);
          resolve(data);
        })
        .catch((error) => {
          alert(error.message);
          window.location.reload();
        });
    });
  }

  /**
   * Logs out the user and clear credentials.
   * @return True if the user was logged out successfully.
   */
  logout(): Observable<boolean> {
    // Customize credentials invalidation here
    this.credentialsService.setCredentials();
    return of(true);
  }
}
