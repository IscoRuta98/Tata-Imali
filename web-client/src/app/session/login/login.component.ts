import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionService } from '../state';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private sessionService: SessionService
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

  async login(form: FormGroup) {
    form.markAllAsTouched();
    if (this.loginForm.valid) {
      const { userName, password } = this.loginForm.value;
      await this.sessionService.login(userName, password)
      .then((res: any) => {
        console.log(res);
          Swal.fire({
            icon: 'success',
            titleText: 'Account Created!',
            confirmButtonText: 'OK'
          });
          this.router.navigate(['/accounts']);
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
    this.loginForm.reset();
    }
  }
