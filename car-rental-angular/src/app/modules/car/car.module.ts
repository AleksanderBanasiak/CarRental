import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CarRoutingModule} from './car-routing.module';
import {MenuComponent} from './components/menu/menu.component';
import {MainComponent} from './pages/main/main.component';
import {CarListComponent} from './pages/car-list/car-list.component';
import {CarCardComponent} from './components/car-card/car-card.component';
import {RatingComponent} from './components/rating/rating.component';
import {MyCarsComponent} from './pages/my-cars/my-cars.component';
import {ManageCarComponent} from './pages/manage-car/manage-car.component';
import {FormsModule} from "@angular/forms";
import {RentedCarListComponent} from './pages/rented-car-list/rented-car-list.component';
import {ReturnCarsComponent} from './pages/return-cars/return-cars.component';


@NgModule({
  declarations: [
    MenuComponent,
    MainComponent,
    CarListComponent,
    CarCardComponent,
    RatingComponent,
    MyCarsComponent,
    ManageCarComponent,
    RentedCarListComponent,
    ReturnCarsComponent
  ],
    imports: [
        CommonModule,
        CarRoutingModule,
        FormsModule
    ]
})
export class CarModule { }
