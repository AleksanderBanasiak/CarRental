import {Component, OnInit} from '@angular/core';
import {PageResponseCarRentedResponse} from "../../../../services/models/page-response-car-rented-response";
import {CarControllerService} from "../../../../services/services/car-controller.service";
import {CarRentedResponse} from "../../../../services/models/car-rented-response";

@Component({
  selector: 'app-return-cars',
  templateUrl: './return-cars.component.html',
  styleUrls: ['./return-cars.component.scss']
})
export class ReturnCarsComponent implements OnInit{

  returnedCars: PageResponseCarRentedResponse = {};
  page = 0;
  size = 5;
  message  = '';
  level = 'success';


  constructor(
    private carService: CarControllerService,
  ) {
  }


  ngOnInit(): void {
    this.findAllReturnedCars();
  }

  private findAllReturnedCars() {
    this.carService.findAllReturnedOwnerCars({
      page: this.page,
      size: this.size
    }).subscribe({
      next: (res) => {
        this.returnedCars = res;
      }
    })
  }


  goToPreviousPage() {
    this.page = 0;
    this.findAllReturnedCars();
  }

  goToFirstPage() {
    this.page--;
    this.findAllReturnedCars();
  }

  goToPage(number: number) {
    this.page = number;
    this.findAllReturnedCars();
  }

  goToNextPage() {
    this.page++;
    this.findAllReturnedCars();
  }

  goToLastPage() {
    this.page = this.returnedCars.totalPages as number -1;
    this.findAllReturnedCars();
  }
  get isLastPage(): boolean {
    return this.page == this.returnedCars.totalPages as number -1;
  }

  approveCarReturn(car: CarRentedResponse) {
    if(!car.returned){
      this.level = 'error';
      this.message = 'Car is not returned yet';
      return;
    }
    this.carService.approveReturnedCar({
      'car_id': car.id as number
    }).subscribe({
      next: () => {
        this.level = 'success';
        this.message = 'Car return approved';
        this.findAllReturnedCars();
      }
    });
  }
}
