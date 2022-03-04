import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CourcesPage } from './cources.page';

describe('CourcesPage', () => {
  let component: CourcesPage;
  let fixture: ComponentFixture<CourcesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourcesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CourcesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
