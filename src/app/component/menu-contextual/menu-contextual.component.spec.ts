import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuContextualComponent } from './menu-contextual.component';

describe('MenuContextualComponent', () => {
  let component: MenuContextualComponent;
  let fixture: ComponentFixture<MenuContextualComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuContextualComponent]
    });
    fixture = TestBed.createComponent(MenuContextualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
