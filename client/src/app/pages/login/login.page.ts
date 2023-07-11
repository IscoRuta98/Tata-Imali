import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.generateLoginForm();
   }

  ngOnInit() {}

  generateLoginForm(): FormGroup{
    return this.formBuilder.group({
      userName: [''],
      password: ['']
    })

  }

  validateForm() {
    if (this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
    }
  }

  loginAccount(form: FormGroup) {
    form.markAllAsTouched();
    if (form.valid) {
      console.log('Button do something')
      this.router.navigate(['/dashboard']);
    }
  }

}
