import { Component, OnInit, Input } from '@angular/core';
import { ElementsModel } from '../models/elements.model';
import { FormGroup, FormControl } from '@angular/forms';
import { FieldValidatorsModel } from '../models/field-validators.model';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DATE_DD_MMM_YYYY_FORMAT } from '../shared/date-formats/date.format';

@Component({
  selector: 'app-dynamic-elements-form',
  templateUrl: './dynamic-elements-form.component.html',
  styleUrls: ['./dynamic-elements-form.component.scss'],
  providers: [{ provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS] },
  { provide: MAT_DATE_FORMATS, useValue: DATE_DD_MMM_YYYY_FORMAT }]
})
export class DynamicElementsFormComponent implements OnInit {

  @Input()
  elements: ElementsModel[] = [];

  @Input()
  elementsForm: FormGroup = new FormGroup({});

  @Input()
  element: ElementsModel = new ElementsModel();

  @Input()
  elementControl: FormControl = new FormControl('');

  constructor() { }

  ngOnInit(): void {
    if (this.element.type === 'radio') {
      let radioValue = this.elementControl.value;
      if (radioValue === '' || radioValue.length === 0) {
        this.elementControl.setValue(this.element.valueList[0].optionKey);
      }
    }
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
}