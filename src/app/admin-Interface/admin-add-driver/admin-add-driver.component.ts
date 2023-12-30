import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpServiceService } from '../../services/http-service.service';

@Component({
  selector: 'app-admin-add-driver',
  templateUrl: './admin-add-driver.component.html',
  styleUrl: './admin-add-driver.component.css'
})
export class AdminAddDriverComponent implements OnInit{

  page = 0;
  search = "";

  drivers: { id: number, firstname: string, lastname: string, email: string, phoneNumber: string, cin: string, enabled: boolean }[] = [];
  displayedDrivers: { id: number, firstname: string, lastname: string, email: string, phoneNumber: string, cin: string, enabled: boolean }[] = [];

  constructor(private router: Router, private httpService: HttpServiceService){};

  // DRIVERS DISPLAY

  ngOnInit(): void {
    const url = "http://localhost:8080/driver-api/get-drivers/0/20/all";
    this.httpService.getRequest(url).subscribe(
      (response) => {
        this.drivers = response.content;
        this.displayedDrivers = response.content;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onDriverEnabledChange(id: number): void{

    var userConfirmed = window.confirm("Are you sure you want to proceed?");
  
    if (userConfirmed) {
      
      const url = "http://localhost:8080/driver-api/enable-or-disable-driver/"+id;
      this.httpService.getRequest(url).subscribe();
    } 
  }

  onSearchChange(): void{
    if(this.search==""){
      this.displayedDrivers = this.drivers;
    }
    else{
      this.displayedDrivers = this.drivers.filter(item =>
        item.lastname.toLowerCase().startsWith(this.search.toLowerCase())
      );
    }
  }



  // DRIVER CREATION

  valid = true;

  firstname = "";
  lastname = "";
  phoneNumber = "";
  email = "";
  cin = "";

  expression: RegExp = /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;

  

  onSubmit(): void{

    this.valid = this.expression.test(this.email);

    const request = {
      "id": 0,
      "firstname": this.firstname,
      "lastname": this.lastname,
      "phoneNumber": this.phoneNumber,
      "email": this.email,
      "enabled": true,
      "cin": this.cin
    };


    if(this.firstname.length>2 && this.lastname.length>2 && this.phoneNumber.length>8 && this.email.length>10 && this.cin.length>4){
      const url = "http://localhost:8080/driver-api/create"
      this.httpService.postRequest(url, request).subscribe(
        (response) => {
          alert("Driver created successfully.")
          this.firstname = "";
          this.lastname = "";
          this.email = "";
          this.phoneNumber = "";
          this.cin = "";
          this.page = 0

          this.ngOnInit();
        }, 
        (error) => {
          alert("Driver already exists.")
        }
      )
    }
  }

 
}
