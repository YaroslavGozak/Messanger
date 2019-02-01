import { Component, OnInit } from '@angular/core';
import { ContactListComponent } from './../contact-list/contact-list.component'
import { NavigationComponent } from './../navigation/navigation.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    let loggedIn = localStorage.getItem("messanger_auth_token");
    if(!loggedIn){
      this.router.navigate(["/login"]);
    }
  }
}
