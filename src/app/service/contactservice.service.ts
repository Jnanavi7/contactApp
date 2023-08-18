import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import { contactsModel } from '../Model/contactsModel';

@Injectable({
  providedIn: 'root'
})
export class ContactserviceService {

  
  baseUrl = "http://localhost:3000/contacts";

  constructor(private http:HttpClient) { }

  getContacts() {
    return this.http.get<contactsModel[]>(this.baseUrl)
  }

  addContacts(data: any) {
    return this.http.post<contactsModel>(this.baseUrl, data)
  }

  deleteContacts(id: number) {
    return this.http.delete<contactsModel>(this.baseUrl + '/' + id)
  }

  updateContacts(data: any, id: number){
    return this.http.put<contactsModel>(this.baseUrl + '/' + id, data)
  }

  fetchContacts(group: string) {
    return this.http.get<contactsModel[]>(this.baseUrl + '?selectGroup=' + group);
  }
 
}
