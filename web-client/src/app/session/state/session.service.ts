import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({ providedIn: 'root' })
export class SessionService {
  constructor(
    private http: HttpClient
  ){}

  async signup(userName: string, phoneNumber: string, password: string) {
    try {
      const URL_SERVER = 'http://127.0.0.1:8000/auth/create'
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      const result = await this.http.post(URL_SERVER, { userName, phoneNumber, password }, { headers }).toPromise();
      return result;
    } catch (error) {
      throw error;
    }
  }

  async login(userName: string, password: string){
    try {
      const URL_SERVER = 'http://127.0.0.1:8000/auth/login'
      const headers = new HttpHeaders({'Content-Type': 'application/json'});
      const result = await this.http.post(URL_SERVER, {userName, password}, { headers }).toPromise()
      return result;
        // (res: any) => {
        //   console.log(res)
        //     const userInfo: UserInformation = res.data;
        //     this.sessionStore.update({ userInfo });
        // }
    } catch (error){
      throw error;
    }
  }
}
