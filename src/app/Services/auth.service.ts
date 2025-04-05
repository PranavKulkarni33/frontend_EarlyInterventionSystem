import { Injectable } from '@angular/core';
import { Amplify, Auth } from 'aws-amplify';
import { environment } from 'src/environments/environment';
import { User } from '../Interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {
    Amplify.configure({
      Auth: {
        region: environment.cognito.region,
        userPoolId: environment.cognito.userPoolId,
        userPoolWebClientId: environment.cognito.userPoolWebClientId,
        authenticationFlowType: environment.cognito.authenticationFlowType
      }
    });
  }

  signUp(user: User): Promise<any> {
    return Auth.signUp({
      username: user.email,
      password: user.password,
      attributes: {
        'custom:name': user.name,
        'custom:role': user.role
      }
    });
  }

  isAuthenticated(): Promise<any> {
    return Auth.currentAuthenticatedUser({ bypassCache: true });
  }

  confirmSignUp(user: User): Promise<any> {
    return Auth.confirmSignUp(user.email, user.code!);
  }

  resendSignUp(user: User): Promise<any> {
    return Auth.resendSignUp(user.email);
  }

  login(user: User): Promise<any> {
    return Auth.signIn(user.email, user.password);
  }

  getUser(): Promise<any> {
    return Auth.currentUserInfo();
  }

  getRole(): Promise<any> {
    return this.getUser().then(user => {
      return user?.attributes ? user.attributes['custom:role'] : '';
    });
  }

  signOut(): Promise<any> {
    return Auth.signOut();
  }

  forgotPassword(email: string): Promise<any> {
    return Auth.forgotPassword(email);
  }

  confirmResetPassword(email: string, code: string, newPassword: string): Promise<any> {
    return Auth.forgotPasswordSubmit(email, code, newPassword);
  }

  getCurrentUser(): Promise<any> {
    return Auth.currentAuthenticatedUser({ bypassCache: true });
  }
  
}
