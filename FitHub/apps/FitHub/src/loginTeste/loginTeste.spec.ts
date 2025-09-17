import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginTeste } from './loginTeste';

describe('LoginTeste', () => {
  let component: LoginTeste;
  let fixture: ComponentFixture<LoginTeste>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginTeste],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginTeste);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
