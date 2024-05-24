import {Component, OnInit} from '@angular/core';
import {CarControllerService} from "../../../../services/services/car-controller.service";
import {Router} from "@angular/router";
import {PageResponseCarResponse} from "../../../../services/models/page-response-car-response";
import {CarResponse} from "../../../../services/models/car-response";

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss']
})
export class CarListComponent implements OnInit{

  page = 0;
  size = 4;
  carResponse: PageResponseCarResponse = {};
  message: string = '';
  level: string = '';


  constructor(
    private carService: CarControllerService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.findAllCars();
  }

  private findAllCars() {
    this.carService.findAllCars({
      page: this.page,
      size: this.size
    }).subscribe({
      next: (cars) => {
        this.carResponse = cars;
      }
    })
  }

  goToPreviousPage() {
    this.page = 0;
    this.findAllCars();
  }

  goToFirstPage() {
    this.page--;
    this.findAllCars();
  }

  goToPage(number: number) {
    this.page = number;
    this.findAllCars();
  }

  goToNextPage() {
    this.page++;
    this.findAllCars();
  }

  goToLastPage() {
    this.page = this.carResponse.totalPages as number -1;
    this.findAllCars();
  }
  get isLastPage(): boolean {
    return this.page == this.carResponse.totalPages as number -1;
  }

  rentCar(car: CarResponse) {
    this.message = '';
    this.carService.rentCar({
      car_id: car.id as number
    }).subscribe({
      next: () => {
        this.level = 'success';
        this.message = 'Car added to your list';
      },
      error: (err) => {
        this.level = 'error';
        this.message = err.error.error;
      }
    });
  }
}
