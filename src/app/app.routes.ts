import { mapToCanActivate, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { AuthGuardService } from './services/authguard.service';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'file-upload', component: FileUploadComponent, canActivate: mapToCanActivate([AuthGuardService])},
];
