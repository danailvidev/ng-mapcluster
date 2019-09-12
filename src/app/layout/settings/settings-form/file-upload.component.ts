import { Component, OnInit } from '@angular/core';

import { UploadFileService } from './file-upload.service';
import { FileUpload } from './file-upload';

@Component({
  selector: 'npo-file-upload',
  templateUrl: './file-upload.component.html'
})
export class FormUploadComponent implements OnInit {

    fileToUpload: File = null;
  currentFileUpload: FileUpload;
  percentage: number;

  constructor(private uploadService: UploadFileService) { }

  ngOnInit() {
  }
 

  upload(files: FileList) {
    this.fileToUpload = files.item(0);

    this.currentFileUpload = new FileUpload(this.fileToUpload);
    this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(
      percentage => {
        this.percentage = Math.round(percentage);
      },
      error => {
        console.log(error);
      }
    );
  }

}
