import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingService } from '../../services/loading/loading.service';
import { AuthService } from '../../services/authentication/auth.service';
import { NotificationService } from '../../services/notification/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  sub: Subscription = new Subscription();
  loginForm!: FormGroup;
  loading$: Observable<boolean> = this.loading.loading$;

  constructor(
    private loading: LoadingService,
    private authAPI: AuthService,
    private router: Router,
    private notificationService: NotificationService,
    private fb: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.compose([Validators.required])],
      password: [''],
    })
  }

  onSubmit(): void {
    this.sub.add(this.authAPI.login(this.loginForm.value.username!, this.loginForm.value.password!)
      .subscribe({
        next: (res) => {
          if (res.status === 200) {
            localStorage.setItem('jwt_token', res.jwt_token);
            this.router.navigate(['/']);
          }
        },
        error: (err) => {
          this.notificationService.notify(err.error.message);
        }
      }));
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
