import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private readonly router: Router) {}

  isAuthenticated(): boolean {
    return !!localStorage.getItem('user');
  }

  logIn(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
    this.router.navigate(['/file-upload']);
  }

  logOut(): void {
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }
}
