import { Directive, Output, EventEmitter, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appFilesDropZone]'
})
export class FilesDropZoneDirective {

  constructor() { }

  @Input()
  accept: string | string[] = "*";

  @Output()
  filesDropped = new EventEmitter<FileList>();

  @Output()
  filesHovered = new EventEmitter<boolean>();

  @HostListener('drop', ['$event'])
  onDrop($event: any) {
    $event.preventDefault();
    $event.stopPropagation();
    this.filesDropped.emit($event.dataTransfer.files);
    this.filesHovered.emit(false);
  }

  @HostListener('dragover', ['$event'])
  onDragOver($event: any) {
    $event.preventDefault();
    $event.stopPropagation();
    this.filesHovered.emit(true);
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave($event: any) {
    $event.preventDefault();
    $event.stopPropagation();
    this.filesHovered.emit(false);
  }

}
