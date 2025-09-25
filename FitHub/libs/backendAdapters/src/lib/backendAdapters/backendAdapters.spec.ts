import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BackendAdapters } from './backendAdapters';

describe('BackendAdapters', () => {
  let component: BackendAdapters;
  let fixture: ComponentFixture<BackendAdapters>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackendAdapters],
    }).compileComponents();

    fixture = TestBed.createComponent(BackendAdapters);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
