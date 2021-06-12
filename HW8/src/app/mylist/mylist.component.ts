import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MylistService } from './shared/mylist.service';
import {MylistModel} from './shared/mylist.model';


@Component({
  selector: 'app-mylist',
  templateUrl: './mylist.component.html',
  styleUrls: ['./mylist.component.css'],
})

export class MylistComponent implements OnInit {
  data: MylistModel[];
  isEmpty = true;

  constructor(public service: MylistService, private router: Router) { }

  ngOnInit(): void {
    this.data = [];
    this.get();
  }

  get(): void{
    this.data = this.service.getData();
    console.log(this.data);
    if (this.data){
      this.isEmpty = !this.isEmpty;
    }
    if (this.data.length === 0){
      this.isEmpty = true;
    }
    console.log(this.isEmpty);

  }

  // tslint:disable-next-line:variable-name
  openDetails(media_type, id): void{
    this.router.navigate(['/watch', media_type, id]).catch(err => console.log(err));
  }

}
