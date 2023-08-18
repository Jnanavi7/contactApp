import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import { helpDesk } from '../Model/helpdeskModel';

@Injectable({
  providedIn: 'root'
})
export class HelpdeskserviceService {

  baseUrl = "http://localhost:3000/helpdesk";

  constructor(private http:HttpClient) { }
  
  gethelpDesk() {
    return this.http.get<helpDesk[]>(this.baseUrl)
  }

  posthelpDesk(data: any) {
    return this.http.post<helpDesk>(this.baseUrl, data)
  }

  deletehelpDesk(id: number) {
    return this.http.delete<helpDesk>(this.baseUrl + '/' + id)
  }

  updatehelpDesk(data: any, id: number){
    return this.http.put<helpDesk>(this.baseUrl + '/' + id, data)
  }

}
