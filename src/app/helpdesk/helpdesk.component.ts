import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { helpDesk } from '../Model/helpdeskModel';
import { HelpdeskserviceService } from '../service/helpdeskservice.service';

@Component({
  selector: 'app-helpdesk',
  templateUrl: './helpdesk.component.html',
  styleUrls: ['./helpdesk.component.css']
})
export class HelpdeskComponent {

  helpDeskform!: FormGroup;
  helpDeskModelObj: helpDesk = new helpDesk();
  helpDeskData!: helpDesk[];
  showAdd!: boolean;
  showUpdate!: boolean;

  submitted = false;

  constructor(private formbuilder: FormBuilder, private helpdeskservice: HelpdeskserviceService) { }

  ngOnInit(): void {
    this.helpDeskform = this.formbuilder.group({
      groupName: ['', Validators.required]

    })
    this.gethelpDesk();
  }

  onclickAdd() {
    this.showAdd = true;
    this.showUpdate = false;
  }
  addhelpDesk() {
    this.helpDeskModelObj.groupName = this.helpDeskform.value.groupName;

    this.helpdeskservice.posthelpDesk(this.helpDeskModelObj)
      .subscribe(res => {
        console.log(res);
        alert("helpDesk Added Successfully")
        let ref = document.getElementById('cancel')
        ref?.click();
        this.helpDeskform.reset();
        this.gethelpDesk();
      });
  }

  deletehelpDesk(row: any) {
    this.helpdeskservice.deletehelpDesk(row.id).subscribe(res => {
      alert("helpDesk Deleted");
      this.gethelpDesk();
    })
  }

  gethelpDesk() {
    this.helpdeskservice.gethelpDesk().subscribe(res => {
      this.helpDeskData = res;
    })
  }

  onEdithelpDesk(row: any) {
    this.helpDeskModelObj.id = row.id;
    this.helpDeskform.controls['groupName'].setValue(row.groupName);

    this.showAdd = false;
    this.showUpdate = true;
  }

  updatehelpDesk() {
    this.helpDeskModelObj.groupName = this.helpDeskform.value.groupName;

    this.helpdeskservice.updatehelpDesk(this.helpDeskModelObj, this.helpDeskModelObj.id).subscribe(res => {
      alert("Updated successfully");
      this.helpDeskform.reset();
      this.gethelpDesk();
    })
  }

  onChange(event: any) {
    this.helpDeskData = event.target.value;
    console.log(event.target.value);
  }

}
