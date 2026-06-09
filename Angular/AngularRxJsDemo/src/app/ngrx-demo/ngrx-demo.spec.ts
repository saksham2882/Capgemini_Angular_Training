import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgRxDemo, appReducer } from './ngrx-demo';
import { provideStore } from '@ngrx/store';

describe('NgRxDemo', () => {
  let component: NgRxDemo;
  let fixture: ComponentFixture<NgRxDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgRxDemo],
      providers: [
        provideStore({ appState: appReducer })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NgRxDemo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
