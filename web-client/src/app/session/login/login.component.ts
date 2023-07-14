import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.generateloginForm();
   }

  ngOnInit(): void {
  }

  generateloginForm(): FormGroup{
    return this.formBuilder.group({
      userName: [''],
      password: [''],
    })

  }

  validateForm() {
    if (this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
    }
  }

  login(form: FormGroup) {
    form.markAllAsTouched();
    if (form.valid) {
      console.log('Button do something')
      this.router.navigate(['/login']);
    }
  }

}
