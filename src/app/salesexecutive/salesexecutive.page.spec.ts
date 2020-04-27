import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SalesexecutivePage } from './salesexecutive.page';

describe('SalesexecutivePage', () => {
  let component: SalesexecutivePage;
  let fixture: ComponentFixture<SalesexecutivePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesexecutivePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SalesexecutivePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
