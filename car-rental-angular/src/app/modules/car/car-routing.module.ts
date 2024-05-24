import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from "./pages/main/main.component";
import {CarListComponent} from "./pages/car-list/car-list.component";
import {MyCarsComponent} from "./pages/my-cars/my-cars.component";
import {ManageCarComponent} from "./pages/manage-car/manage-car.component";
import {RentedCarListComponent} from "./pages/rented-car-list/rented-car-list.component";
import {ReturnCarsComponent} from "./pages/return-cars/return-cars.component";
import {authGuard} from "../../services/guard/auth.guard";

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        component: CarListComponent,
        canActivate: [authGuard]
      },
      {
        path: 'my-cars',
        component: MyCarsComponent,
        canActivate: [authGuard]
      },
      {
        path: 'manage',
        component: ManageCarComponent,
        canActivate: [authGuard]
      },
      {
        path: 'manage/:carId',
        component: ManageCarComponent,
        canActivate: [authGuard]
      },
      {
        path: 'my-rented-cars',
        component: RentedCarListComponent,
        canActivate: [authGuard]
      },
      {
        path: 'my-returned-cars',
        component: ReturnCarsComponent,
        canActivate: [authGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarRoutingModule { }
