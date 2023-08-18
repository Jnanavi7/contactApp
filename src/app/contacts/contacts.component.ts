import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { helpDesk } from '../Model/helpdeskModel';
import { contactsModel } from '../Model/contactsModel';
import { HelpdeskserviceService } from '../service/helpdeskservice.service';
import { ContactserviceService } from '../service/contactservice.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent {

  helpDeskData!: helpDesk[];
  contactForm!: FormGroup;
  contactsModelObj: contactsModel = new contactsModel();
  contactData!: contactsModel[];
  selectedGroup!: string;

  showAdd!: boolean;
  showUpdate!: boolean;
  submitted = false;

  constructor(private helpdeskservice: HelpdeskserviceService, private formbuilder: FormBuilder, private contactservice: ContactserviceService) {
  }

  ngOnInit(): void {
    this.contactForm = this.formbuilder.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      selectGroup: ['null', Validators.required],
      email: ['', Validators.required],
      birthday: ['', Validators.required]
    })
    this.gethelpDesks();
    this.getContactsData();
  }

  onClickAdd() {
    this.showAdd = true;
    this.showUpdate = false;
  }

  addContactsData() {
    console.log(this.contactForm.value);
    this.contactsModelObj.name = this.contactForm.value.name;
    this.contactsModelObj.phone = this.contactForm.value.phone;
    this.contactsModelObj.selectGroup = this.selectedGroup;
    this.contactsModelObj.email = this.contactForm.value.email;
    this.contactsModelObj.birthday = this.contactForm.value.birthday;

    this.contactservice.addContacts(this.contactsModelObj).subscribe(res => {
      console.log(res)
      alert("Contact Added Successfully")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.contactForm.reset();
      this.getContactsData();
    })
  }

  getContactsData() {
    this.contactservice.getContacts().subscribe(res => {
      this.contactData = res;
    })
  }

  deleteContactsData(id: number) {
    this.contactservice.deleteContacts(id).subscribe(res => {
      alert("Contact Deleted");
      this.getContactsData();
    })
  }

  onEditContactData(row: any) {
    this.contactsModelObj.id = row.id;
    this.contactForm.controls['name'].setValue(row.name);
    this.contactForm.controls['phone'].setValue(row.phone);
    this.contactForm.controls['selectGroup'].setValue(row.selectGroup);
    this.contactForm.controls['email'].setValue(row.email);
    this.contactForm.controls['birthday'].setValue(row.birthday);

    this.showAdd = false;
    this.showUpdate = true;
  }

  updateContactsData() {
    this.contactsModelObj.name = this.contactForm.value.name;
    this.contactsModelObj.phone = this.contactForm.value.phone;
    this.contactsModelObj.selectGroup = this.contactForm.value.selectGroup;
    this.contactsModelObj.email = this.contactForm.value.email;
    this.contactsModelObj.birthday = this.contactForm.value.birthday;
    this.contactservice.updateContacts(this.contactsModelObj, this.contactsModelObj.id).subscribe(res => {
      alert("Data Updated Successfully");
      this.getContactsData();
    })

  }

  gethelpDesks() {
    this.helpdeskservice.gethelpDesk().subscribe(res => {           //got from helpdesk component to iterate dropdrow option
      this.helpDeskData = res;
      // console.log(res);
    })
  }

  onChangeEvent(event: any) {
    this.selectedGroup = event.target.value;
    console.log(event.target.value);
    // console.log(event.text)
  }
}
