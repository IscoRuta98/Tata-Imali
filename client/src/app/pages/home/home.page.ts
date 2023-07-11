import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  registrationForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.registrationForm = this.generateRegistratioinForm();
  }

  generateRegistratioinForm(): FormGroup{
    return this.formBuilder.group({
      userName: [''],
      cellPhoneNumber: [''],
      password: [''],
      confirmPassword: ['']
    })

  }

  validateForm() {
    if (this.registrationForm.valid) {
      this.registrationForm.markAllAsTouched();
    }
  }

  createAccount(form: FormGroup) {
    form.markAllAsTouched();
    if (form.valid) {
      console.log('Button do something')
      this.router.navigate(['/login']);
    }
  }
}
