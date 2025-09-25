import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Shareds } from './shareds';

describe('Shareds', () => {
  let component: Shareds;
  let fixture: ComponentFixture<Shareds>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Shareds],
    }).compileComponents();

    fixture = TestBed.createComponent(Shareds);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
