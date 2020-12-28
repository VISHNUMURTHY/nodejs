import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpCommonService } from '../services/http-common.service';
import { HttpResponse } from '@angular/common/http';
import { FirmListModel } from '../models/firm-list.model';

@Component({
  selector: 'app-new-firm',
  templateUrl: './new-firm.component.html',
  styleUrls: ['./new-firm.component.scss']
})
export class NewFirmComponent implements OnInit {
  newFirmForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, private router: Router, private httpService: HttpCommonService) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.newFirmForm = this.fb.group({
      firmName: new FormControl(''),
      firmUrl: new FormControl(''),
      fromDate: new FormControl(''),
      endDate: new FormControl(''),
      referralEmail: new FormControl(''),
      salesRepEmail: new FormControl(''),
      address: new FormControl(''),
      firmPhone: new FormControl(''),
      firmEmail: new FormControl(''),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      contactEmail: new FormControl(''),
      contactPhone: new FormControl(''),
    })
  }

  onSubmit() {
    this.newFirmForm.markAllAsTouched();
    if (this.newFirmForm.valid) {
      console.log("new Firm", this.newFirmForm.getRawValue());
      this.httpService.saveFirm(this.newFirmForm.getRawValue()).subscribe((res: HttpResponse<FirmListModel[]>) => {
        console.log("new Firm", res.body);
      })
      this.router.navigateByUrl('/user/firms');
    }
  }

}
