import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MuniecaPageComponent } from './munieca-page.component';

describe('MuniecaPageComponent', () => {
  let component: MuniecaPageComponent;
  let fixture: ComponentFixture<MuniecaPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MuniecaPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MuniecaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
