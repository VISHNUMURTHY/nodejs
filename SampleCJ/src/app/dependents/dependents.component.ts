import { Component, OnInit, Input } from '@angular/core';
import { SectionsModel } from '../models/sections.model';
import { SortPipe } from '../shared/pipes/sort.pipe';
import { MatTableDataSource } from '@angular/material/table';
import { ElementsModel } from '../models/elements.model';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { DynamicDialogFormComponent } from '../common/dynamic-dialog-form/dynamic-dialog-form.component';
import { FormGroupService } from '../shared/services/form-group.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dependents',
  templateUrl: './dependents.component.html',
  styleUrls: ['./dependents.component.scss']
})
export class DependentsComponent implements OnInit {
  displayedColumns: string[] = [];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  elements: ElementsModel[] = [];

  @Input()
  dependentsData: SectionsModel[] = [];

  @Input()
  dependentsForm: FormGroup = new FormGroup({});

  constructor(private sort: SortPipe, private dialog: MatDialog, private fgService: FormGroupService) { }

  ngOnInit(): void {
    console.log("dependents form", this.dependentsForm);
    let sample = { fullName: 'Child One', ssn: '89798987', dob: new Date(), relation: 'child' };

    this.dependentsData = this.sort.transform(this.dependentsData, 'asc', 'sequence');
    this.elements = this.dependentsData[0].elements;
    this.displayedColumns = this.elements.map((el: ElementsModel) => el.name);
    this.displayedColumns.push('actions');
    console.log("display columns", this.displayedColumns);
    this.dataSource = new MatTableDataSource<any>([sample]);

    console.log("Dependents ", this.dependentsData);
  }

  addDependent() {
    let form = this.fgService.toFormGroupByElements(this.dependentsData[0].elements) as FormGroup;
    let dialogConfig = new MatDialogConfig();
    dialogConfig.width = '60%';
    dialogConfig.minHeight = '40vh';
    dialogConfig.panelClass = 'dynamic-dialog-form-panel';
    dialogConfig.backdropClass = 'dynamic-dialog-form-backdrop'
    dialogConfig.hasBackdrop = true;
    dialogConfig.data = { formGroup: form, elements: this.dependentsData[0].elements };
    dialogConfig.autoFocus = true;
    dialogConfig.closeOnNavigation = true;
    dialogConfig.disableClose = true;
    let dialogRef = this.dialog.open(DynamicDialogFormComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log("File uploaded data", result)
    });
  }

  editDependent(values: any) {
    // this.dependentsData[0].elements.forEach(el => {
    //   if(el.type === 'single-select'){
    //     el.valueList.forEach(val => {

    //     });
    //   }
    // })
    let form = this.fgService.toFormGroupByElementsAndValues(this.dependentsData[0].elements, values);
    console.log("form", form);
    let dialogConfig = new MatDialogConfig();
    dialogConfig.width = '60%';
    dialogConfig.minHeight = '40vh';
    dialogConfig.panelClass = 'dynamic-dialog-form-panel';
    dialogConfig.backdropClass = 'dynamic-dialog-form-backdrop'
    dialogConfig.hasBackdrop = true;
    dialogConfig.data = { formGroup: form, elements: this.dependentsData[0].elements };
    dialogConfig.autoFocus = true;
    dialogConfig.closeOnNavigation = true;
    dialogConfig.disableClose = true;
    let dialogRef = this.dialog.open(DynamicDialogFormComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log("File uploaded data", result)
    });
  }
}
