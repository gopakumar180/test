import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListdataPage } from './listdata.page';

describe('ListdataPage', () => {
  let component: ListdataPage;
  let fixture: ComponentFixture<ListdataPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListdataPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListdataPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
