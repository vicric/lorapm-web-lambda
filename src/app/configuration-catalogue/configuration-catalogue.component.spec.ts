import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationCatalogueComponent } from './configuration-catalogue.component';

describe('ConfigurationCatalogueComponent', () => {
  let component: ConfigurationCatalogueComponent;
  let fixture: ComponentFixture<ConfigurationCatalogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigurationCatalogueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurationCatalogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
