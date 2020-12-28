import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, observable } from 'rxjs';
import { NewWorkFlowModel } from '../models/new-workflow.model';
import { WorkFlowListModel } from '../models/work-flow-list.model';
import { FirmListModel } from '../models/firm-list.model';

@Injectable({
  providedIn: 'root'
})
export class HttpCommonService {

  private BASE_URL = environment.API_SERVER_URL;

  constructor(private http: HttpClient) { }

  getWorkflowList(): Observable<HttpResponse<WorkFlowListModel[]>> {
    return this.http.get<WorkFlowListModel[]>(this.BASE_URL + '/workflow.json', { observe: 'response' });
  }

  getSearchOptions():Observable<HttpResponse<string[]>> {
    return this.http.get<string[]>(this.BASE_URL + '/search.json', { observe: 'response' });
  }

  getTabsData():Observable<HttpResponse<NewWorkFlowModel>> {
    return this.http.get<NewWorkFlowModel>(this.BASE_URL + '/template_v3.json', { observe: 'response' });
  }

  getFirmsList(): Observable<HttpResponse<FirmListModel[]>> {
    return this.http.get<FirmListModel[]>(this.BASE_URL + '/firmlist.json', { observe: 'response' });
  }

  fuzzySearch(fuzzy:string):Observable<HttpResponse<FirmListModel[]>> {
    return this.http.get<FirmListModel[]>(this.BASE_URL + '/firmlist.json', { observe: 'response' });
  }
  
  saveFirm(firm: any): Observable<HttpResponse<FirmListModel[]>> {
    return  new Observable();//this.http.get<FirmListModel[]>(this.BASE_URL + '/firmlist.json', { observe: 'response' });
  }
}
