import { Injectable, OnDestroy } from '@angular/core';
import { AuthService } from './auth.service';

const TIMER = 5 * 60;

@Injectable({
  providedIn: 'root'
})
export class TimerService implements OnDestroy {
  timeoutId: NodeJS.Timeout | undefined;
  timeoutValue: number = TIMER;

  constructor(private readonly authService: AuthService) {}

  getTimeInMinutes(): string {
    const integerPart = Math.floor(this.timeoutValue/60);
    const decimalPart = (this.timeoutValue/60) - integerPart;
    return `${integerPart} : ${Math.round(decimalPart*60)}` ;
  }

  resetTimer() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    this.timeoutValue = TIMER;
    this.timeoutId = setInterval(() => {
      this.timeoutValue--;
      if (this.timeoutValue == 0) {
        clearInterval(this.timeoutId);
        alert('Session expired');
        this.authService.logOut();
      }
    }, 1000);
  }

  clearTimer() {
    clearTimeout(this.timeoutId);
  }

  ngOnDestroy() {
    clearTimeout(this.timeoutId);
  }
}
