import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FieldValidatorsModel } from 'src/app/models/filed-validators.model';
import { FormControl, FormGroup } from '@angular/forms';
import { ElementsModel } from 'src/app/models/elements.model';

@Component({
  selector: 'app-dynamic-dialog-form',
  templateUrl: './dynamic-dialog-form.component.html',
  styleUrls: ['./dynamic-dialog-form.component.scss']
})
export class DynamicDialogFormComponent implements OnInit {
  formGroup: FormGroup = new FormGroup({});
  elements: ElementsModel[] = [];

  constructor(public dialogRef: MatDialogRef<DynamicDialogFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.elements = data.elements;
    this.formGroup = data.formGroup;
  }

  ngOnInit(): void {

  }

  isRequired(validators: FieldValidatorsModel[]) {
    let required = false;
    validators?.forEach((el: FieldValidatorsModel) => {
      if (el.type === 'required')
        required = true;
    });
    return required;
  }

  getErrorMessages(control: FormControl, fieldValidators: FieldValidatorsModel[]) {
    let errors: string[] = [];
    fieldValidators?.forEach((validator: FieldValidatorsModel) => {
      if (control.hasError(validator.type))
        errors.push(validator.message);
    });
    return errors;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(){
    console.log('dialog form', this.formGroup);
  }

}
