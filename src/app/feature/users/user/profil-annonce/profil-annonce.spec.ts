import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilAnnonce } from './profil-annonce';

describe('ProfilAnnonce', () => {
  let component: ProfilAnnonce;
  let fixture: ComponentFixture<ProfilAnnonce>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfilAnnonce],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfilAnnonce);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
