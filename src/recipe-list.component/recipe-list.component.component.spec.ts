import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeListComponentComponent } from './recipe-list.component.component';

describe('RecipeListComponentComponent', () => {
  let component: RecipeListComponentComponent;
  let fixture: ComponentFixture<RecipeListComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecipeListComponentComponent]
    });
    fixture = TestBed.createComponent(RecipeListComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
