import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginRegister } from './login-register';
import { User } from './user-information';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  updateProfileInformation: any;
  constructor(private http: HttpClient, private router: Router) { }


  register(data) {
    console.log('register', data);
    return this.http.put(
      'http://hotelmanagement-env.eba-byszbdrw.us-east-2.elasticbeanstalk.com/userRegistration', data
    );
  }

  login(data): Observable<LoginRegister> {
    console.log('service', data);
    return this.http.post<LoginRegister>(
      'http://hotelmanagement-env.eba-byszbdrw.us-east-2.elasticbeanstalk.com/adminEmployeeUserLogin', data
    );
  }


  getProfileData(data): Observable<LoginRegister> {
    return this.http.post<LoginRegister>('http://hotelmanagement-env.eba-byszbdrw.us-east-2.elasticbeanstalk.com/adminUserEmployeeProfile', data);
  }
  updateProfileForm(data) {
    console.log(data);
    return this.http.put('http://hotelmanagement-env.eba-byszbdrw.us-east-2.elasticbeanstalk.com/updateUserProfile', data);
  }

  updateProfileInfo(profileInfo) {
    this.updateProfileInformation = profileInfo;
    this.router.navigateByUrl('/vertical-header/admin-update-profile');
  }

}
