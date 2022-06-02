import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { DataService } from '../data.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

  checkIn: any;
  checkOut: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private dataService: DataService,
    private dialogRef : MatDialogRef<BookComponent>,
    private snackBar : MatSnackBar
  ) { }

  

  ngOnInit(): void {
    console.log(this.data);
  }

  calculateTotal(checkIn: any, checkOut: any) {
    const checkInDate = moment(checkIn, 'MM/DD/YYYY');
    const checkOutDate = moment(checkOut, 'MM/DD/YYYY');
    const nights = checkOutDate.diff(checkInDate, 'days');
    const total = nights * this.data.home.price;
    if(total > 0 && total < 10000)
      return total;
    else
      return '--';
  }

  bookHome() {
    this.dataService.bookHome$().subscribe(()=>{
      this.dialogRef.close();
      this.snackBar.open("Home booked!");
    });
  }
}
