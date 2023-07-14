import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  registrationForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.registrationForm = this.generateRegistratioinForm();
   }

  ngOnInit(): void {
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
