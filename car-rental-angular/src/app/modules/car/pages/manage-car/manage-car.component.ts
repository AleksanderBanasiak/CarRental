import {Component, OnInit} from '@angular/core';
import {CarRequest} from "../../../../services/models/car-request";

import {CarControllerService} from "../../../../services/services/car-controller.service";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-manage-car',
  templateUrl: './manage-car.component.html',
  styleUrls: ['./manage-car.component.scss']
})
export class ManageCarComponent implements OnInit{

  errorMsg: Array<string> = [];
  selectedPicture: string | undefined;
  selectedCarImg: any;
  carRequest: CarRequest = {brand: '', horsepower: 0, model: '', shareable: false, yearOfProduction: 0};


  constructor(
    private carService: CarControllerService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  onFileSelected(file: any) {
    this.selectedCarImg = file.target.files[0];
    console.log(this.selectedCarImg);
    if(this.selectedCarImg){
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedPicture = reader.result as string;
      };
      reader.readAsDataURL(this.selectedCarImg);
    }
  }

  saveCar() {
    this.carService.saveCar({
      body: this.carRequest
    }).subscribe({
      next: (carId) => {
        this.carService.uploadCarImage({
          'car_id' : carId,
          body: {
            file: this.selectedCarImg
          }
        }).subscribe({
          next: () => {
            this.router.navigate(['/cars/my-cars']);
          }
        });
      },
      error: (err) => {
        console.log(err.error);
        this.errorMsg = err.error.validationErrors;
      }
    });
  }

  ngOnInit(): void {
    const carId = this.activatedRoute.snapshot.params['carId'];
    if(carId){
      this.carService.findCarById({
        'car_id': carId
      }).subscribe({
        next: (car) => {
          this.carRequest = {
            id: car.id,
            horsepower: car.horsepower,
            yearOfProduction: car.yearOfProduction,
            brand: car.brand as string,
            model: car.model as string,
            shareable: car.shareable
          }
          if(car.carImg){
            this.selectedPicture = 'data:image/jpg;base64, '+ car.carImg;
          }
        }
      })
    }
  }
}
