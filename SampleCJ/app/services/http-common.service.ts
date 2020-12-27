import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FillingElementModel } from '../models/filling-element.model';
import { NewWorkFlowModel } from '../models/new-workflow.model';

@Injectable({
  providedIn: 'root'
})
export class HttpCommonService {

  private BASE_URL = environment.API_SERVER_URL;

  constructor(private http: HttpClient) { }

  getWorkflowData(): Observable<HttpResponse<FillingElementModel[]>> {
    return this.http.get<FillingElementModel[]>(this.BASE_URL + '/workflow.json', { observe: 'response' });
  }

  getSearchOptions():Observable<HttpResponse<string[]>> {
    return this.http.get<string[]>(this.BASE_URL + '/search.json', { observe: 'response' });
  }

  getTabsData():Observable<HttpResponse<NewWorkFlowModel>> {
    return this.http.get<NewWorkFlowModel>(this.BASE_URL + '/template_v3.json', { observe: 'response' });
  }
}
