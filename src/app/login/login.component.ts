import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Promise } from 'q';
import { LoginService } from './../services/login.service';
import * as $ from 'jquery';
import { switchMap } from 'rxjs/operators';
import { CodeNode } from 'source-list-map';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  phoneNumber: string;
  confirmationCode: string;
  cleanPhoneNumber: string;
  loginForm: FormGroup;
  isSubmitted: boolean = false;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
     this.loginForm = new FormGroup({
    'phone': new FormControl(this.phoneNumber, [
      Validators.required,
      Validators.minLength(14),
      Validators.maxLength(14),
    ]),
    'code': new FormControl('',[
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(6),
    ])
  });
  }

  get phone() { return this.loginForm.get("phone"); }
  get code() { return this.loginForm.get("code"); }

  onSendCode(){
    this.isSubmitted = true;
    console.log("Calling this.loginService.clearPhoneNumber...");
    this.cleanPhoneNumber = this.loginService.clearPhoneNumber(this.phone.value);
    console.log("Calling this.loginService.verifyPhoneNumber for" + this.cleanPhoneNumber + "...");
    if(this.loginService.verifyPhoneNumber(this.cleanPhoneNumber)){
      this.loginService.sendVerificationCode(this.cleanPhoneNumber);
      $('#verification_area').show("fast");
    }
    else{
      // Invalid phone number
      this.phone.setErrors({
        required: true
      })
    }
  }

  onVerifyCode(){
    console.log("Verifying...");
    console.log(this.code.value);
    this.loginService.verifyCode(this.code.value, this.phone.value)
    .toPromise()
    .then(codeConfirmed => {
      if(codeConfirmed){
        // OK
        localStorage.setItem("messanger_auth_token","loggedin_" + this.cleanPhoneNumber);
        this.router.navigate(['/dashboard']);
      }
      else{
        // Invalid code
        $("#invalid_code").show();
      }
    })
    .catch((err) => {
      $("#invalid_code").show();
    });
  }







  // Some JS function to do magic with phone number field
  isNumericInput(event){
    const key = event.keyCode;
    return ((key >= 48 && key <= 57) || // Allow number line
      (key >= 96 && key <= 105) // Allow number pad
    );
  };
  
  isModifierKey(event){
    const key = event.keyCode;
    return (event.shiftKey === true || key === 35 || key === 36) || // Allow Shift, Home, End
      (key === 8 || key === 9 || key === 13 || key === 46) || // Allow Backspace, Tab, Enter, Delete
      (key > 36 && key < 41) || // Allow left, up, right, down
      (
        // Allow Ctrl/Command + A,C,V,X,Z
        (event.ctrlKey === true || event.metaKey === true) &&
        (key === 65 || key === 67 || key === 86 || key === 88 || key === 90)
      )
  };
  
  enforceFormat(event){
    // Input must be of a valid number format or a modifier key, and not longer than ten digits
    if(!this.isNumericInput(event) && !this.isModifierKey(event)){
      event.preventDefault();
    }
  };
  
  formatToPhone(event){
    if(this.isModifierKey(event)) {return;}
  
    // I am lazy and don't like to type things more than once
    const target = event.target;
    const input = event.target.value.replace(/\D/g,'').substring(0,10); // First ten digits of input only
    const zip = input.substring(0,3);
    const middle = input.substring(3,6);
    const last = input.substring(6,10);
  
    if(input.length > 6){target.value = `(${zip}) ${middle} ${last}`;}
    else if(input.length > 3){target.value = `(${zip}) ${middle}`;}
    else if(input.length > 0){target.value = `(${zip}`;}
  };
}
