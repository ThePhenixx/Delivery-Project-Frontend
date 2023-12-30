import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpServiceService } from '../../services/http-service.service';

@Component({
  selector: 'app-client-in-progress',
  templateUrl: './client-in-progress.component.html',
  styleUrl: './client-in-progress.component.css'
})
export class ClientInProgressComponent implements OnInit{

  allowed = false;

  constructor(private httpService: HttpServiceService, private router: Router){}

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

  toAccount(): void{

    this.router.navigate(["client-account"])
  }

  toDelivered(): void{

    this.router.navigate(["client-delivered"])
  }
    


  ngOnInit(): void {

    if(localStorage.getItem("role") == "CLIENT"){
      this.allowed = true;
    }

  //   const page = 0;
  //   const pagesize = 20;
  //   const uid = localStorage.getItem("activeToken");
  //   const url = "http://localhost:8080/client-api/in-progress-packages/"+page+"/"+pagesize+"/"+uid;
    
  //   this.httpService.getRequest("url").subscribe(
  //     (response) => {
  //       console.log(response);
  //     },
  //     (error) => {
  //       console.error(error);
  //     }
  //   );

  }
}
