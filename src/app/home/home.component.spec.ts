import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';

import { spyOnClass } from 'jasmine-es6-spies';
import { DataService } from '../data.service';
import { of } from 'rxjs';
import { DialogService } from '../dialog.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let dataService: jasmine.SpyObj<DataService>;
  let dialogService : jasmine.SpyObj<DialogService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [
        { provide: DataService, useFactory: () => spyOnClass(DataService) },
        { provide: DialogService, useFactory: () => spyOnClass(DialogService) }
        //Error: <toHaveBeenCalled> : Expected a spy, but got Function.
        // Usage: expect(<spyObj>).toHaveBeenCalled()
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;

    dataService = TestBed.inject(DataService) as jasmine.SpyObj<DataService>;
    dialogService = TestBed.inject(DialogService) as jasmine.SpyObj<DialogService>;
    const homes = require('../../assets/homes.json');
    dataService.getHomes$.and.returnValue(of(homes));
    fixture.detectChanges(); //always after mocking statements!!!

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show homes', () => {

    const homes = require('../../assets/homes.json');
    expect(fixture.nativeElement.querySelectorAll('[data-test="home"]').length).toBe(homes.length);
  });

  it('should show home info', () => {
    const home = fixture.nativeElement.querySelector('[data-test="home"]');

    expect(home.querySelector('[data-test="title"]').innerText).toEqual('Home 1');
    expect(home.querySelector('[data-test="image"]')).toBeTruthy();
    expect(home.querySelector('[data-test="location"]').innerText).toEqual('Germany');
  });

  it('should show Book button', ()=>{
    const home = fixture.nativeElement.querySelector('[data-test="home"]');

    expect(home.querySelector('[data-test="book-btn"]')).toBeTruthy();
  });

  it('should use dialog service to open dialog when clicking on Book button', ()=>{
    
    // grab the button to click
    const bookBtn = fixture.nativeElement.querySelector('[data-test="home"] button');
    // click the button
    bookBtn.click();
    // assert that the dialog service was used to open a dialog
    expect(dialogService.open).toHaveBeenCalled();
  });

});
