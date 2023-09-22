import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeMedicalComponent } from './home-medical.component';

describe('HomeMedicalComponent', () => {
  let component: HomeMedicalComponent;
  let fixture: ComponentFixture<HomeMedicalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeMedicalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeMedicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
