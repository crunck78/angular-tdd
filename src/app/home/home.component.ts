import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BookComponent } from '../book/book.component';
import { DataService } from '../data.service';
import { DialogService } from '../dialog.service';

interface HomeInterface {
  title: string,
  image: string,
  location: string
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  homes$!: Observable<HomeInterface[]>;

  constructor(private dataService : DataService,
    private dialogService : DialogService) { }

  ngOnInit(): void {
    this.homes$ = this.dataService.getHomes$();
  }

  openDialog(home : any){
    this.dialogService.open(BookComponent, {
      with : '250px',
      data : { home }
    });
  }

}
