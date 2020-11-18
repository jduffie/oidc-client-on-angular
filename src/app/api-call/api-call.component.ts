import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-api-call',
  templateUrl: './api-call.component.html',
  styleUrls: ['./api-call.component.css']
})
export class ApiCallComponent implements OnInit {

  constructor(public http: HttpClient ) { }

  ngOnInit(): void {
  }

  public ping() {
    console.log('invoking GET to example.com');
    this.http.get('http://localhost:4200/')
      .subscribe(
        data => console.log(data),
        err => console.log(err)
      );
  }

}
