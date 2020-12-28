import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { HandSetService } from '../shared/services/hand-set.service';
import { HttpCommonService } from '../services/http-common.service';
import { HttpResponse } from '@angular/common/http';
import { startWith, map } from 'rxjs/operators';
import { FirmListModel } from '../models/firm-list.model';

@Component({
  selector: 'app-firms-list',
  templateUrl: './firms-list.component.html',
  styleUrls: ['./firms-list.component.scss']
})
export class FirmsListComponent implements OnInit {
  isHandset$: Observable<boolean>;
  fuzzyControl: FormControl = new FormControl('');
  nameFilter: FormControl = new FormControl('');
  statusFilter: FormControl = new FormControl('');
  contactFilter: FormControl = new FormControl('');
  tagsFilter: FormControl = new FormControl('');
  paymentDueFilter: FormControl = new FormControl('');
  creationDateFilter: FormControl = new FormControl('');
  options: string[] = [];
  filteredOptions?: Observable<string[]>;
  displayedColumns = ['name', 'status', 'contact', 'tags', 'paymentDue', 'creationDate'];
  dataSource: MatTableDataSource<FirmListModel> = new MatTableDataSource<FirmListModel>([]);
  firmFilter = { 'name': '', 'status': '', 'contact': '', 'tags': '', 'paymentDue': '', 'creationDate': '' };

  @ViewChild(MatPaginator)
  paginator?: MatPaginator;

  constructor(private handSet: HandSetService, private httpService: HttpCommonService) {
    this.isHandset$ = this.handSet.isHandset$;
    this.dataSource.filterPredicate = this.createFirmListFilter();
  }

  ngOnInit(): void {
    this.nameFilter.valueChanges.subscribe((name: string) => {
      this.firmFilter.name = name.trim().toLowerCase();
      this.dataSource.filter = JSON.stringify(this.firmFilter);
    });

    this.statusFilter.valueChanges.subscribe((status: string) => {
      this.firmFilter.status = status.trim().toLowerCase();
      this.dataSource.filter = JSON.stringify(this.firmFilter);
    });

    this.contactFilter.valueChanges.subscribe((contact: string) => {
      this.firmFilter.contact = contact.trim().toLowerCase();
      this.dataSource.filter = JSON.stringify(this.firmFilter);
    });

    this.tagsFilter.valueChanges.subscribe((tags: string) => {
      this.firmFilter.tags = tags.trim().toLowerCase();
      this.dataSource.filter = JSON.stringify(this.firmFilter);
    });

    this.paymentDueFilter.valueChanges.subscribe((paymentDue: string) => {
      this.firmFilter.paymentDue = paymentDue.trim().toLowerCase();
      this.dataSource.filter = JSON.stringify(this.firmFilter);
    });

    this.creationDateFilter.valueChanges.subscribe((creationDate: string) => {
      this.firmFilter.creationDate = creationDate.trim().toLowerCase();
      this.dataSource.filter = JSON.stringify(this.firmFilter);
    });

    this.fuzzyControl.valueChanges.subscribe((fuzzy: string) => {
      this.httpService.fuzzySearch(fuzzy).subscribe((res: HttpResponse<FirmListModel[]>) => {
        if (res.body !== null) {
          this.dataSource = new MatTableDataSource<FirmListModel>(res.body);
          this.dataSource.paginator = this.paginator || null;
        }
      }, (err: HttpResponse<any>) => {
        console.log("Error", err);
      });
    });

    this.httpService.getFirmsList().subscribe((res: HttpResponse<FirmListModel[]>) => {
      if (res.body !== null) {
        this.dataSource = new MatTableDataSource<any>(res.body);
        this.dataSource.paginator = this.paginator || null;
      }
    }, (err: HttpResponse<any>) => {
      console.log("Error", err);
    });

    this.httpService.getSearchOptions().subscribe((res: HttpResponse<string[]>) => {
      if (res.body !== null) {
        this.options = res.body;
      }
    }, (err: HttpResponse<any>) => {
      console.log("Error", err);
    });

    this.filteredOptions = this.fuzzyControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  ngAfterViewInit() {
    this.isHandset$.subscribe((handSet: boolean) => {
      if (handSet)
        this.dataSource.paginator = null;
      else
        this.dataSource.paginator = this.paginator || null;
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  createFirmListFilter(): (data: any, filter: string) => boolean {
    let firmFilterFunction = function (data: any, filter: string): boolean {
      let firm = JSON.parse(filter);
      return data.name.trim().toLowerCase().indexOf(firm.name) !== -1
        && data.status.trim().toLowerCase().indexOf(firm.status) !== -1
        && data.contact.trim().toLowerCase().indexOf(firm.contact) !== -1
        && data.tags.trim().toLowerCase().indexOf(firm.tags) !== -1
        && data.paymentDue.trim().toLowerCase().indexOf(firm.paymentDue) !== -1
        && data.creationDate.trim().toLowerCase().indexOf(firm.creationDate) !== -1;
    }
    return firmFilterFunction;
  }
}
