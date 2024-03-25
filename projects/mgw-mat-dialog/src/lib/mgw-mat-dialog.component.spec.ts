import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MgwMatDialogComponent } from './mgw-mat-dialog.component';

describe('MgwMatDialogComponent', () => {
  let component: MgwMatDialogComponent;
  let fixture: ComponentFixture<MgwMatDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [MgwMatDialogComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(MgwMatDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
