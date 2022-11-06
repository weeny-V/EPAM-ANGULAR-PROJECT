import { Observable, Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { LoadingService } from '../../services/loading/loading.service';
import { AuthService } from '../../services/authentication/auth.service';
import { NotificationService } from '../../services/notification/notification.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {
  @ViewChild('password') passwordField!: ElementRef;
  @ViewChild('confirm') confirmField!: ElementRef;

  sub: Subscription = new Subscription();
  signupForm!: FormGroup;
  passwordVisibility: boolean = false;
  confirmVisibility: boolean = false;
  loading$: Observable<boolean> = this.loading.loading$;

  constructor(
    private loading: LoadingService,
    private authAPI: AuthService,
    private notificationService: NotificationService,
    private fb: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      username: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(16)],
      )],
      password: ['', Validators.compose([
        Validators.pattern('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$'),
        Validators.required
        ])
      ],
      confirm: ['', Validators.compose([Validators.required])],
    })
  }

  onSubmit(): void {
    const { username, password, confirm } = this.signupForm.value;

    if (password !== confirm) {
      this.notificationService.notify('Passwords don\'t match');
      return;
    }

    this.sub.add(this.authAPI.signup(username!, password!)
      .subscribe({
        next: (res) => {
          if (res.status === 200) {
            this.notificationService.notify(res.message)
            this.signupForm.reset();
          }
        },
        error: (err) => {
          this.notificationService.notify(err.error.message)
        }
      }));
  }

  changePasswordVisibility(type: string): void {
    if (type === 'SHOW') {
      this.passwordField.nativeElement.type = 'text'
      this.passwordVisibility = true;
    } else if (type === 'HIDE') {
      this.passwordField.nativeElement.type = 'password';
      this.passwordVisibility = false;
    }
  }

  changeConfirmVisibility(type: string): void {
    if (type === 'SHOW') {
      this.confirmField.nativeElement.type = 'text'
      this.confirmVisibility = true;
    } else if (type === 'HIDE') {
      this.confirmField.nativeElement.type = 'password';
      this.confirmVisibility = false;
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
