import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LeadPage } from './lead.page';

describe('LeadPage', () => {
  let component: LeadPage;
  let fixture: ComponentFixture<LeadPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeadPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LeadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
