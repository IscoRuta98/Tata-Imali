import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionService } from '../state';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  registrationForm: UntypedFormGroup;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private sessionService: SessionService
  ) {
    this.registrationForm = this.generateRegistratioinForm();
   }

  ngOnInit(): void {
  }

  generateRegistratioinForm(): UntypedFormGroup{
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

  async createAccount(form: UntypedFormGroup) {
    form.markAllAsTouched();
    if (this.registrationForm.valid) {
      const { userName, cellPhoneNumber, password } = this.registrationForm.value;
      await this.sessionService.signup(userName, cellPhoneNumber, password)
      .then((res: any) => {
        console.log(res);
          Swal.fire({
            icon: 'success',
            titleText: 'Account Created!',
            confirmButtonText: 'OK'
          });
          this.router.navigate(['/login']);
      })
      .catch(error => {
        Swal.fire({
          icon: 'error',
          titleText: 'Account not Created!',
          text: error,
          confirmButtonText: 'OK'
        });
      })
    }
    this.registrationForm.reset();
  }

}
