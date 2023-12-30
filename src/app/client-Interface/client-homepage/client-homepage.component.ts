import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-homepage',
  templateUrl: './client-homepage.component.html',
  styleUrl: './client-homepage.component.css'
})
export class ClientHomepageComponent {

  allowed = false;

  page = 0;

  constructor(private router: Router){}

  ngOnInit(): void {
    if(localStorage.getItem("role") == "CLIENT"){
      this.allowed = true;
    }
  }

  onLogout():void {

    localStorage.removeItem("activeToken");
    localStorage.removeItem("uid");
    localStorage.removeItem("firstname");
    localStorage.removeItem("lastname");
    localStorage.removeItem("email");
    localStorage.removeItem("phonenumber");
    localStorage.removeItem("role");

    this.router.navigate(["login"]);
  }
}
