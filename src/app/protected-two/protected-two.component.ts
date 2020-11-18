import { Component, OnInit } from '@angular/core';


// this is a peer of the other 'protected' page. It's used to demonstrate 2 things: If you are already logged in and then
//  - same browser instance toggling between 2 protected pages
//      jump between this page and the other protected page, then you can see from the console
//      that user is extracted from session state and no calls are made to ID provider
//  - same user but different browser instance
//      from user perspective, the behavior is same - ie. you are not prompted to login
//      under the covers, the client is making calls to the ID provider
@Component({
  selector: 'app-protected-two',
  templateUrl: './protected-two.component.html',
  styleUrls: ['./protected-two.component.css']
})
export class ProtectedTwoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
