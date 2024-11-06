import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { Router } from '@angular/router';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  constructor(
    private readonly router: Router,
    private readonly storageService: LocalStorageService
  ) {}

  isAuthenticated(): boolean {
    return !!this.storageService.get('user');
  }

  getUser(): User {
    return JSON.parse(this.storageService.get('user') ?? '');
  }

  logIn(user: User): void {
    this.storageService.save('user', JSON.stringify(user));
    this.router.navigate(['/file-upload']);
  }

  logOut(): void {
    this.storageService.clear();
    this.router.navigate(['/']);
  }
}
