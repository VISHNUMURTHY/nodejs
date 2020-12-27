import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FileUploadComponent } from '../file-upload/file-upload.component';
import { SectionsModel } from '../models/sections.model';
import { SortPipe } from '../shared/pipes/sort.pipe';
import { FormGroup } from '@angular/forms';
import { HandSetService } from '../shared/services/hand-set.service';
import { Observable } from 'rxjs';
import { FileHandlerService } from '../shared/services/file-handler.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-attachments',
  templateUrl: './attachments.component.html',
  styleUrls: ['./attachments.component.scss']
})
export class AttachmentsComponent implements OnInit {
  isHandset$: Observable<boolean>;
  isHovering: boolean = true;
  selectedFiles: File[] = [];
  progressInfos = [];
  message = '';

  fileInfos: Observable<any>;

  @Input()
  attachmentsData: SectionsModel[] = [];

  @Input()
  attachmentsForm: FormGroup = new FormGroup({});

  // constructor(public dialog: MatDialog, private sort: SortPipe, private handSet: HandSetService, private fuService: FileHandlerService) {
  //   this.isHandset$ = this.handSet.isHandset$;
  // }

  ngOnInit(): void {
    //this.attachmentsData = this.sort.transform(this.attachmentsData, 'asc', 'sequence');
    //this.fileInfos = this.fuService.getFiles();
    console.log("Attachments ", this.attachmentsForm);
  }

  // toggleHover(event: boolean) {
  //   this.isHovering = event;
  // }

  // onDrop(files: FileList) {
  //   for (let i = 0; i < files.length; i++) {
  //     if (files.item(i) !== null)
  //       this.selectedFiles.push(files.item(i));

  //     for (let i = 0; i < this.selectedFiles.length; i++) {
  //       this.upload(i, this.selectedFiles[i]);
  //     }
  //   }
  // }

  // upload(idx, file) {
  //   this.progressInfos[idx] = { value: 0, fileName: file.name, message:'' };

  //   this.fuService.uploadFile(file).subscribe(
  //     event => {
  //       if (event.type === HttpEventType.UploadProgress) {
  //         this.progressInfos[idx].value = Math.round(100 * event.loaded / event.total);
  //       } else if (event instanceof HttpResponse) {
  //         this.fileInfos = this.fuService.getFiles();
  //         this.message = 'File uploaded successfully.';
  //       }
  //     },
  //     err => {
  //       this.progressInfos[idx].value = 0;
  //       this.message = 'Could not upload the file:' + file.name;
  //     });
  // }

  // openFileUploadDialog(): void {
  //   let dialogConfig = new MatDialogConfig();
  //   dialogConfig.minWidth = '40vw';
  //   dialogConfig.minHeight = '40vh';
  //   dialogConfig.panelClass = 'file-upload-panel';
  //   dialogConfig.backdropClass = 'file-upload-backdrop'
  //   dialogConfig.hasBackdrop = true;
  //   dialogConfig.data = 'File upload content';
  //   dialogConfig.restoreFocus = true;
  //   dialogConfig.closeOnNavigation = true;
  //   dialogConfig.disableClose = false;
  //   const dialogRef = this.dialog.open(FileUploadComponent, dialogConfig);

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log("File uploaded data", result)
  //   });
  // }

}
