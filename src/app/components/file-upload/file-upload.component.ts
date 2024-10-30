import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss',
})
export class FileUploadComponent {
  fileUploadForm = new FormGroup({
    file: new FormControl(),
  });
  successMessage : string = '';
  dangerMessage: string = '';

  getFiles() {
    return JSON.parse(localStorage.getItem('files') ?? '[]');
  }

  onFileUpload(event: Event) {
    const fileUploaded = (event.target as HTMLInputElement)?.files;
    this.fileUploadForm
      .get('file')
      ?.setValue(fileUploaded ? fileUploaded[0] : null);
    const { name, type, size } = this.fileUploadForm.get('file')?.value || '';
    const id = this.getFiles().length + 1;
    localStorage.setItem(
      'files',
      JSON.stringify([
        ...this.getFiles(),
        { id, name, type, size },
      ])
    );
    this.successMessage = 'File has been uploaded.';
    setTimeout(() => {
      this.closeSucessMessage();
    }, 1000);
  }

  deleteFile(id: number): void {
    localStorage.setItem(
      'files',
      JSON.stringify([
        ...this.getFiles().filter((el: any) => el.id != id),
      ])
    );
    this.dangerMessage = 'File has been deleted.';
    setTimeout(() => {
      this.closeDangerMessage();
    }, 1000);
  }


  closeSucessMessage() {
    this.successMessage = '';
  }
  closeDangerMessage() {
    this.dangerMessage = '';
  }
}
