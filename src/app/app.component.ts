import { Component, HostListener, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';
import { TimerService } from './services/timer.service';
import { LocalStorageService } from './services/local-storage.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'angular-file-uploader';

  constructor(
    readonly authService: AuthService,
    readonly timerService: TimerService,
    private readonly storageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    initFlowbite();
    this.storageService.clear();
  }

  @HostListener('click', ['$event']) handleHostClick(_: PointerEvent) {
    if (this.authService.isAuthenticated()) {
      this.timerService.resetTimer();
    }
  }

  logOut() {
    this.timerService.clearTimer();
    this.authService.logOut();
  }
}
