import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpServiceService } from '../../services/http-service.service';

@Component({
  selector: 'app-client-delivered',
  templateUrl: './client-delivered.component.html',
  styleUrl: './client-delivered.component.css'
})
export class ClientDeliveredComponent implements OnInit {

  search = "";

  packages: {id: number, reference: string, description: string, weight: number, address: string, traject:{id: number, source: string, destination: string}, client:{uid: string, firstname: string, lastname: string, email: string, phonenumber: string}, creationDate: string, deliveryDate: string}[] = [];
  Allpackages: {id: number, reference: string, description: string, weight: number, address: string, traject:{id: number, source: string, destination: string}, client:{uid: string, firstname: string, lastname: string, email: string, phonenumber: string}, creationDate: string, deliveryDate: string}[] = [];

  constructor(private httpService: HttpServiceService, private router: Router){}
  
  ngOnInit(): void {
    const url1 = "http://localhost:8080/package-api/get-delevired-packages/0/20/all"
    this.httpService.getRequest(url1).subscribe(
      (response) => {
        this.packages = response.content;
        this.Allpackages = response.content;
        console.log(response);
      },
      (error) => {
        console.log(error)
      }
    );
    }

    onSearchChange(): void{
      this.packages = this.Allpackages.filter(item =>
        item.reference.toLowerCase().startsWith(this.search.toLowerCase())
      );
    }
}
