import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TimerService } from '../../services/timer.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { FileModel } from '../../model/file.model';

const alertMessageTimer = 1000;

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss'
})
export class FileUploadComponent implements OnInit{
  fileUploadForm = new FormGroup({
    file: new FormControl(),
  });
  successMessage : string = '';
  dangerMessage: string = '';

  constructor(readonly timerService: TimerService, private readonly storageService: LocalStorageService) {}

  ngOnInit(): void {
    this.timerService.resetTimer();
  }

  getFiles(): FileModel[] {
    return JSON.parse(this.storageService.get('files', false) ?? '[]');
  }

  onFileUpload(event: Event) {
    const fileUploaded = (event.target as HTMLInputElement)?.files;
    this.fileUploadForm
      .get('file')
      ?.setValue(fileUploaded ? fileUploaded[0] : null);
    const { name, type, size } = this.fileUploadForm.get('file')?.value || '';
    const id = this.getFiles().length + 1;
    this.storageService.save(
      'files',
      JSON.stringify([
        ...this.getFiles(),
        { id, name, type, size },
      ]),
      false
    );
    this.timerService.resetTimer();
    this.successMessage = 'File has been uploaded.';
    setTimeout(() => {
      this.closeSucessMessage();
    }, alertMessageTimer);
  }

  deleteFile(id: number): void {
    this.storageService.save(
      'files',
      JSON.stringify([
        ...this.getFiles().filter((el: FileModel) => el.id != id),
      ]),
      false
    );
    this.timerService.resetTimer();
    this.dangerMessage = 'File has been deleted.';
    setTimeout(() => {
      this.closeDangerMessage();
    }, alertMessageTimer);
  }

  closeSucessMessage() {
    this.successMessage = '';
  }

  closeDangerMessage() {
    this.dangerMessage = '';
  }
}
