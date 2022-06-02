import { TestBed } from '@angular/core/testing';

import { DialogService } from './dialog.service';

//A temporarily disabled describe. Specs within an xdescribe will be marked pending and not executed.
xdescribe('DialogService', () => {
  let service: DialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
