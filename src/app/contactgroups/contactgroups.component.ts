import { Component } from '@angular/core';
import { ContactserviceService } from '../service/contactservice.service';
import { ActivatedRoute, ParamMap, Params } from '@angular/router';
import { contactsModel } from '../Model/contactsModel';

@Component({
  selector: 'app-contactgroups',
  templateUrl: './contactgroups.component.html',
  styleUrls: ['./contactgroups.component.css']
})
export class ContactgroupsComponent {

  constructor(private contactservice: ContactserviceService, private activatedRoute: ActivatedRoute) { }

  contactData!: contactsModel[];
  groupdata!: string;
  
  ngOnInit(): void{
    this.activatedRoute.paramMap.subscribe((param: Params) => {
      this.groupdata = param['get']("group");
      this.FilterGroup(this.groupdata);
    });
  }

  FilterGroup(group: string) {
    this.contactservice.fetchContacts(group).subscribe((data) => {
      console.log(group);
      console.log(data);
      this.contactData= data;
    })
  }

}
