import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactgroupsComponent } from './contactgroups.component';

describe('ContactgroupsComponent', () => {
  let component: ContactgroupsComponent;
  let fixture: ComponentFixture<ContactgroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactgroupsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactgroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
