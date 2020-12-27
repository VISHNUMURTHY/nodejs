import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { SectionsModel } from '../models/sections.model';
import { SortPipe } from '../shared/pipes/sort.pipe';
import { ElementsModel } from '../models/elements.model';
import { FormGroupService } from '../shared/services/form-group.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss'],
  //encapsulation: ViewEncapsulation.None
})
export class PersonalInfoComponent implements OnInit {
  
  elements: ElementsModel[] = [];

  @Input()
  personalInfoData: SectionsModel[] = [];

  @Input()
  personalInfoForm: FormGroup = new FormGroup({});

  constructor(private sort: SortPipe, private fgService: FormGroupService) { }

  ngOnInit(): void {
    this.personalInfoData = this.sort.transform(this.personalInfoData, 'asc', 'sequence');

    //this.personalInfoForm = this.fgService.toFormGroupBySections(this.personalInfoData)
    console.log("Personal InfoData Form", this.personalInfoForm);
  }

  onSubmit(){
    this.personalInfoForm.markAllAsTouched();
  }

  getFormGroup(control: string){
    return this.personalInfoForm.controls[control] as FormGroup;
  }
}
