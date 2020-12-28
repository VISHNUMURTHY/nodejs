import { Injectable } from '@angular/core';
import { ElementsModel } from 'src/app/models/elements.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FieldValidatorsModel } from 'src/app/models/filed-validators.model';
import { SectionsModel } from 'src/app/models/sections.model';
import { DependentsModel } from 'src/app/models/dependents.model';
import { TabsModel } from 'src/app/models/tabs.model';

@Injectable({
  providedIn: 'root'
})
export class FormGroupService {

  constructor() { }

  toFormGroupByTabs(tabs: TabsModel[]): FormGroup {
    let formGroupByTabs: any = {};

    tabs.forEach((tab: TabsModel) => {
      formGroupByTabs[tab.name] = this.toFormGroupBySections(tab.sections);
    });
    return new FormGroup(formGroupByTabs);
  }

  toFormGroupBySections(sections: SectionsModel[]) {
    let formGroupBySections: any = {};

    sections.forEach((section: SectionsModel) => {
      formGroupBySections[section.name] = this.toFormGroupByElements(section.elements);
    });
    return new FormGroup(formGroupBySections);
  }

  toFormGroupByElements(elements: ElementsModel[]) {
    let formGroupByElements: any = {};

    elements.forEach((element: ElementsModel) => {
      if (element?.name)
        formGroupByElements[element.name] = element.validators ? new FormControl('', Validators.compose(this.getValidatorsCompose(element.validators))) : new FormControl('');
    });
    return new FormGroup(formGroupByElements);
  }

  toFormGroupByElementsAndValues(elements: ElementsModel[], values: any) {
    let formGroupByElements: any = {};

    elements.forEach((element: ElementsModel) => {
      if (element?.name)
        formGroupByElements[element.name] = element.validators ? new FormControl(values[element.name], Validators.compose(this.getValidatorsCompose(element.validators))) : new FormControl(values[element.name]);
    });
    return new FormGroup(formGroupByElements);
  }

  getValidatorsCompose(validators: FieldValidatorsModel[]) {
    let formValidators: any[] = [];

    validators.forEach((el: FieldValidatorsModel) => {
      if (el.type === 'required')
        formValidators.push(Validators.required);
      if (el.type === 'pattern')
        formValidators.push(Validators.pattern(el.value as string));
      if (el.type === 'minlength')
        formValidators.push(Validators.minLength(el.value as number));
    });

    return formValidators;
  }

}
