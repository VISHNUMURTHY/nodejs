import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { HandSetService } from '../shared/services/hand-set.service';
import { HttpCommonService } from '../services/http-common.service';
import { HttpResponse } from '@angular/common/http';
import { WorkFlowListModel } from '../models/work-flow-list.model';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-work-flow',
  templateUrl: './work-flow.component.html',
  styleUrls: ['./work-flow.component.scss']
})
export class WorkFlowComponent implements OnInit, AfterViewInit {
  isHandset$: Observable<boolean>;
  searchControl = new FormControl();
  options: string[] = [];
  filteredOptions?: Observable<string[]>;
  displayedColumns = ['name', 'status', 'usage', 'tags', 'createdDate'];
  dataSource: MatTableDataSource<WorkFlowListModel> = new MatTableDataSource<WorkFlowListModel>([]);

  @ViewChild(MatPaginator)
  paginator?: MatPaginator;

  @ViewChild(MatSort)
  sort: MatSort;

  constructor(private handSet: HandSetService, private httpService: HttpCommonService) {
    this.isHandset$ = this.handSet.isHandset$;
  }

  ngOnInit(): void {
    this.httpService.getWorkflowList().subscribe((res: HttpResponse<WorkFlowListModel[]>) => {
      if (res.body !== null) {
        this.dataSource = new MatTableDataSource<any>(res.body);
        this.dataSource.paginator = this.paginator || null;
        this.dataSource.sort = this.sort;
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

    this.filteredOptions = this.searchControl.valueChanges
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
    this.dataSource.sort = this.sort;
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
}