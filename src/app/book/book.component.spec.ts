import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { spyOnClass } from 'jasmine-es6-spies';
import { of } from 'rxjs';
import { DataService } from '../data.service';

import { BookComponent } from './book.component';

describe('BookComponent', () => {
  let component: BookComponent;
  let fixture: ComponentFixture<BookComponent>;
  let dialogData: any;
  let dataService: jasmine.SpyObj<DataService>;
  let dialogService: jasmine.SpyObj<MatDialogRef<BookComponent>>;
  let notificationService : jasmine.SpyObj<MatSnackBar>

  const queryTestingSelector = (selector: string) => fixture.nativeElement.querySelector(selector);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookComponent],
      imports: [FormsModule, MatSnackBarModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: DataService, useFactory: () => spyOnClass(DataService) },
        { provide: MatDialogRef, useFactory: () => spyOnClass(MatDialogRef) },
        { provide: MatSnackBar, useFactory: () => spyOnClass(MatSnackBar) },
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookComponent);
    dialogData = TestBed.inject(MAT_DIALOG_DATA);
    component = fixture.componentInstance;

    dataService = TestBed.inject(DataService) as jasmine.SpyObj<DataService>;
    dialogService = TestBed.inject(MatDialogRef) as jasmine.SpyObj<MatDialogRef<BookComponent>>;
    notificationService = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;

    const homes = require('../../assets/homes.json');
    dialogData.home = homes[0];

    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  it('should show title', () => {
    expect(queryTestingSelector('[data-test="title"]').textContent).toContain('Book Home 1');
  });

  it('should show price per night', () => {
    expect(queryTestingSelector('[data-test="price"]').textContent).toContain('$125 per night');
  });

  it('should show check in date field', () => {
    expect(queryTestingSelector('[data-test="check-in"]')).toBeTruthy();
  });

  it('should show check out date field', () => {
    expect(queryTestingSelector('[data-test="check-out"]')).toBeTruthy();
  });

  it('should show total price', () => {
    //user enter check in date: 12/10/19
    const checkIn = queryTestingSelector('[data-test="check-in"] input');
    checkIn.value = '12/20/19';
    checkIn.dispatchEvent(new Event('input'));
    //user enter check out date: 12/23/19
    const checkOut = queryTestingSelector('[data-test="check-out"] input');
    checkOut.value = '12/23/19';
    checkOut.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    //assert that the total show 3x125=375
    expect(queryTestingSelector('[data-test="total"]').textContent).toContain('Total: $375');
  });

  it('should book home after clicking the book button', () => {
    //dataService.bookHome$.and.returnValue(of(null));
    //user enter check in date: 12/10/19
    const checkIn = queryTestingSelector('[data-test="check-in"] input');
    checkIn.value = '12/20/19';
    checkIn.dispatchEvent(new Event('input'));
    //user enter check out date: 12/23/19
    const checkOut = queryTestingSelector('[data-test="check-out"] input');
    checkOut.value = '12/23/19';
    checkOut.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    queryTestingSelector('[data-test="book-btn"] button').click();

    expect(dataService.bookHome$).toHaveBeenCalled();
  });

  it('should close the dialog and show notification after clicking the Book Button', () => {
    dataService.bookHome$.and.returnValue(of({}));
    
    const checkIn = queryTestingSelector('[data-test="check-in"] input');
    checkIn.value = '12/20/19';
    checkIn.dispatchEvent(new Event('input'));
   
    const checkOut = queryTestingSelector('[data-test="check-out"] input');
    checkOut.value = '12/23/19';
    checkOut.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    queryTestingSelector('[data-test="book-btn"] button').click();

    expect(dialogService.close).toHaveBeenCalled();
    expect(notificationService.open).toHaveBeenCalled();
  });

  it('should show -- for total price if dates are invalid', () => {
    //user enter check in date: 12/10/19
    const checkIn = queryTestingSelector('[data-test="check-in"] input');
    checkIn.value = '';
    checkIn.dispatchEvent(new Event('input'));
    //user enter check out date: 12/23/19
    const checkOut = queryTestingSelector('[data-test="check-out"] input');
    checkOut.value = '';
    checkOut.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    //assert that the total show 3x125=375
    expect(queryTestingSelector('[data-test="total"]').textContent).toContain('Total: $--');
  });
});