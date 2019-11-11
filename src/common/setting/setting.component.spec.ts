import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingComponent } from './setting.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SettingsService } from '../../crypt/service/settings.service';

describe('SettingComponent', () => {
  let component: SettingComponent;
  let fixture: ComponentFixture<SettingComponent>;

  const SettingsServiceSpy = jasmine.createSpyObj('SettingsService', ['getActiveSetting']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, MatInputModule, NoopAnimationsModule],
      declarations: [ SettingComponent ],
      providers: [{ provide: SettingsService, useValue: SettingsServiceSpy }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    SettingsServiceSpy.getActiveSetting.and.returnValue({
      apiUrl: "http://example.com",
      apiKey: "123"
    });
    expect(component).toBeTruthy();
  });
});
