import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionService, SessionStore } from '../state';
import Swal from 'sweetalert2';
import { UserInformation } from 'src/app/schema/entities';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: UntypedFormGroup;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private sessionService: SessionService,
    private sessionStore: SessionStore,
  ) {
    this.loginForm = this.generateloginForm();
   }

  ngOnInit(): void {
  }

  generateloginForm(): UntypedFormGroup{
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

  async login(form: UntypedFormGroup) {
    form.markAllAsTouched();
    if (this.loginForm.valid) {
      const { userName, password } = this.loginForm.value;
      await this.sessionService.login(userName, password)
      .then((res: any) => {
          console.log(res.Opened);
          const userInfo: UserInformation = res.Opened;
          this.sessionStore.update({ userInfo });
            Swal.fire({
              icon: 'success',
              titleText: 'Succesfully Logged in!',
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
