import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpServiceService } from '../../services/http-service.service';

@Component({
  selector: 'app-client-in-progress',
  templateUrl: './client-in-progress.component.html',
  styleUrl: './client-in-progress.component.css'
})
export class ClientInProgressComponent implements OnInit{

  search = "";

  packages: {id: number, reference: string, description: string, presentLocation: string, weight: number, address: string, traject:{id: number, source: string, destination: string}, client:{uid: string, firstname: string, lastname: string, email: string, phonenumber: string}, creationDate: string, deliveryDate: string}[] = [];
  Allpackages: {id: number, reference: string, description: string, presentLocation: string, weight: number, address: string, traject:{id: number, source: string, destination: string}, client:{uid: string, firstname: string, lastname: string, email: string, phonenumber: string}, creationDate: string, deliveryDate: string}[] = [];

  constructor(private httpService: HttpServiceService){};

  ngOnInit(): void {
    const page = 0;
    const pagesize = 40;
    const uid = localStorage.getItem("uid");
    const url = "http://localhost:8080/users-api/in-progress-packages/"+page+"/"+pagesize+"/"+uid;
    
    console.log(url);
    this.httpService.getRequest(url).subscribe(
      (response) => {
        this.packages = response.content;
        this.Allpackages = response.content;
      },
      (error) => {
        console.error(error);
      }
    );

  }

  onSearchChange(): void{
    this.packages = this.Allpackages.filter(item =>
      item.reference.toLowerCase().startsWith(this.search.toLowerCase())
    );
  }
}
