import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePersonalInformationComponent } from './home-personal-information.component';

describe('HomePersonalInformationComponent', () => {
  let component: HomePersonalInformationComponent;
  let fixture: ComponentFixture<HomePersonalInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomePersonalInformationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePersonalInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
