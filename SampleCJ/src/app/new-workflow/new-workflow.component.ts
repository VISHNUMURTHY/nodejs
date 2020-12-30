import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';
import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { Observable } from 'rxjs';
import { HandSetService } from '../shared/services/hand-set.service.js';
import { DATE_DD_MMM_YYYY_FORMAT } from '../shared/date-formats/date.format';
import { HttpCommonService } from '../services/http-common.service.js';
import { HttpResponse } from '@angular/common/http';
import { NewWorkFlowModel } from '../models/new-workflow.model.js';
import { TabsModel } from '../models/tabs.model.js';
import { FormGroupService } from '../shared/services/form-group.service.js';
import { FormGroup, FormBuilder } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

const moment = _rollupMoment || _moment;

@Component({
  selector: 'app-new-workflow',
  templateUrl: './new-workflow.component.html',
  styleUrls: ['./new-workflow.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS] },
    { provide: MAT_DATE_FORMATS, useValue: DATE_DD_MMM_YYYY_FORMAT },
    { provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true } }
  ]
})
export class NewWorkflowComponent implements OnInit, AfterViewInit {
  isHandset$: Observable<boolean>;
  newWorkflow: NewWorkFlowModel = new NewWorkFlowModel();
  tabs: TabsModel[] = [];
  selectedIndex = 0;
  tabsFormGroup: FormGroup = new FormGroup({});

  @ViewChild(MatTabGroup)
  tabGroup?: MatTabGroup;

  constructor(private fb: FormBuilder, private handSet: HandSetService, private httpService: HttpCommonService, private fgService: FormGroupService) {
    this.isHandset$ = this.handSet.isHandset$;
  }

  ngOnInit(): void {
    this.httpService.getTabsData().subscribe((res: HttpResponse<NewWorkFlowModel>) => {
      if (res.body !== null) {
        this.newWorkflow = res.body;
        this.tabs = this.newWorkflow.tabs;
        this.tabsFormGroup = this.fgService.toFormGroupByTabs(this.tabs);
        //new FormGroup({tabForm:this.fgService.toFormGroupByTabs(this.tabs)});
        console.log("tabs form group", this.tabsFormGroup);
      }
    }, (err: HttpResponse<any>) => {
      console.log("Error", err);
    });
  }

  ngAfterViewInit(): void {
    this.tabGroup?._tabs.toArray().forEach((el, index) => {
      if (index !== 0)
        el.disabled = true;
      else
        el.disabled = false;
    });

  }

  update() {
    this.selectedIndex = this.selectedIndex + 1;
    this.tabGroup?._tabs.toArray().forEach((el, index) => {
      if (index === 0)
        el.disabled = false;
      if (index === this.selectedIndex)
        el.disabled = false;
    });
    console.log("tab group update", this.tabGroup?._tabs);
  }

  onSubmit() {
    console.log("tabs form group", this.tabsFormGroup.getRawValue());
  }

  getFormGroup(group: FormGroup) {
    return group as FormGroup;
  }

  log(el: any) {
    console.log("any", el);
  }
}
