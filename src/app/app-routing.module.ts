import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HelpdeskComponent } from './helpdesk/helpdesk.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ContactgroupsComponent } from './contactgroups/contactgroups.component';
import { HeaderComponent } from './header/header.component';

const routes: Routes = [
  {path:'helpdesk',component:HelpdeskComponent},
  {path:'contacts',component:ContactsComponent},
  {path:'contactgroups/:group',component:ContactgroupsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
