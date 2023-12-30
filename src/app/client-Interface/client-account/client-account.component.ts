import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpServiceService } from '../../services/http-service.service';

@Component({
  selector: 'app-client-account',
  templateUrl: './client-account.component.html',
  styleUrl: './client-account.component.css'
})
export class ClientAccountComponent implements OnInit {

  firstname = "";
  lastname = "";
  email = "";
  phonenumber= "";
  address = "";

  constructor(private httpService: HttpServiceService, private router: Router){}

  ngOnInit(): void {
    
    this.firstname = localStorage.getItem("firstname")||"";
    this.lastname = localStorage.getItem("lastname")||"";
    this.email = localStorage.getItem("email")||"";
    this.phonenumber = localStorage.getItem("phonenumber")||"";
    this.address = localStorage.getItem("address")||"";
  }

}
