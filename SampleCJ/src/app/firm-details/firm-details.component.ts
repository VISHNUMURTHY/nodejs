import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-firm-details',
  templateUrl: './firm-details.component.html',
  styleUrls: ['./firm-details.component.scss']
})
export class FirmDetailsComponent implements OnInit {
  tabs = ['Details', 'Billing', 'Messages', 'Workflows', 'Audit'];

  constructor() { }

  ngOnInit(): void {

  }

}
