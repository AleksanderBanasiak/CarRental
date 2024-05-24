import {Component, OnInit} from '@angular/core';
import {PageResponseCarRentedResponse} from "../../../../services/models/page-response-car-rented-response";
import {CarRentedResponse} from "../../../../services/models/car-rented-response";
import {CarControllerService} from "../../../../services/services/car-controller.service";
import {FeedbackRequest} from "../../../../services/models/feedback-request";
import {FeedbackControllerService} from "../../../../services/services/feedback-controller.service";

@Component({
  selector: 'app-rented-car-list',
  templateUrl: './rented-car-list.component.html',
  styleUrls: ['./rented-car-list.component.scss']
})
export class RentedCarListComponent implements OnInit{
  rentedCars: PageResponseCarRentedResponse = {};
  feedbackRequest: FeedbackRequest = {carId: 0, comment: "", note: 0};
  page = 0;
  size = 5;
  selectedCar: CarRentedResponse | undefined = undefined;


  constructor(
    private carService: CarControllerService,
    private feedbackService: FeedbackControllerService
  ) {
  }

  returnRentedCar(car: CarRentedResponse) {
    console.log(car.id);
    this.selectedCar = car;
    this.feedbackRequest.carId = car.id as number;
  }

  ngOnInit(): void {
    this.findAllRentedCars();
  }

  private findAllRentedCars() {
    this.carService.findAllRentedOwnerCars({
      page: this.page,
      size: this.size
    }).subscribe({
      next: (res) => {
        this.rentedCars = res;
      }
    })
  }


  goToPreviousPage() {
    this.page = 0;
    this.findAllRentedCars();
  }

  goToFirstPage() {
    this.page--;
    this.findAllRentedCars();
  }

  goToPage(number: number) {
    this.page = number;
    this.findAllRentedCars();
  }

  goToNextPage() {
    this.page++;
    this.findAllRentedCars();
  }

  goToLastPage() {
    this.page = this.rentedCars.totalPages as number -1;
    this.findAllRentedCars();
  }
  get isLastPage(): boolean {
    return this.page == this.rentedCars.totalPages as number -1;
  }

  returnCar(b: boolean) {
    this.carService.returnCar({
      'car_id': this.selectedCar?.id as number
    }).subscribe({
      next: () => {
        if(b){
          this.giveFeedback();
        }
        this.selectedCar = undefined;
        this.findAllRentedCars();
      }
    });
  }

  private giveFeedback() {
    this.feedbackService.saveFeedback({
      body: this.feedbackRequest
    }).subscribe({
      next: () => {
      }
    });
  }

  protected readonly undefined = undefined;
}
