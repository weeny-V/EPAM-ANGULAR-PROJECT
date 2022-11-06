import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { IUser } from '../../types/main';
import { UserService } from '../../services/user/user.service';
import { StoreService } from '../../services/store/store.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {
  sub: Subscription = new Subscription();
  isOpen: boolean = false;
  user!: IUser;

  constructor(
    private userAPI: UserService,
    private store: StoreService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.sub.add(this.userAPI.getUserInfo()
      .subscribe({
        next: (res) => {
          if (res.status === 200) {
            this.user = res.user;
            this.store.setUserInfo(res.user);
          }
        }
      }));
  }

  logout(): void {
    localStorage.removeItem('jwt_token');
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
