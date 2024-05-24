import {Component, OnInit} from '@angular/core';
import {PageResponseCarResponse} from "../../../../services/models/page-response-car-response";
import {CarControllerService} from "../../../../services/services/car-controller.service";
import {Router} from "@angular/router";
import {CarResponse} from "../../../../services/models/car-response";

@Component({
  selector: 'app-my-cars',
  templateUrl: './my-cars.component.html',
  styleUrls: ['./my-cars.component.scss']
})
export class MyCarsComponent implements OnInit{

  page = 0;
  size = 4;
  carResponse: PageResponseCarResponse = {};


  constructor(
    private carService: CarControllerService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.findAllCars();
  }

  private findAllCars() {
    this.carService.findAllOwnerCars({
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


  archiveCar(car: CarResponse) {
    this.carService.updateArchivedStatus({
      'car_id': car.id as number
    }).subscribe({
      next: () => {
        car.archived = !car.archived;
      }
    });
  }

  editCar(car: CarResponse) {
    this.router.navigate(['cars', 'manage', car.id]);
  }

  shareCar(car: CarResponse) {
    this.carService.updateShareableStatus({
      'car_id': car.id as number
    }).subscribe({
      next: () => {
        car.shareable = !car.shareable;
      }
    });
  }
}
