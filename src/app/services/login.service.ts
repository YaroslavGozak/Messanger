import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  apiUrl: string;

  constructor(private http: HttpClient) { }

  clearPhoneNumber(dirtyNumber: string): string{
    if(!dirtyNumber)
      return '';
    let numbers = dirtyNumber.match(/\d+/g);
    let phoneNumber = "";
    for(var phNumber in numbers){
      console.log(numbers[phNumber]);
      phoneNumber += numbers[phNumber];
    }
    return phoneNumber;
  }

  verifyPhoneNumber(phoneNumber: string): boolean{
    if(!phoneNumber || phoneNumber.length != 10)
      return false;
    for(var i = 0; i < phoneNumber.length; i++){
      let digit = +phoneNumber[i];
      console.log(digit);
      if(Number.isNaN(digit))
        return false;
    }
    return true;
  }

  sendVerificationCode(phoneNumber: string){
    // this.http.post(this.apiUrl,{number: phoneNumber});
  }

  verifyCode(code: string, phoneNumber: string): Observable<boolean>{
    if(!code)
      return of(false);
    let verified = code.length == 6;
    return of(verified);
    //return this.http.get<boolean>(this.apiUrl);
  }
}
