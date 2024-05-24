/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { approveReturnedCar } from '../fn/car-controller/approve-returned-car';
import { ApproveReturnedCar$Params } from '../fn/car-controller/approve-returned-car';
import { CarResponse } from '../models/car-response';
import { findAllCars } from '../fn/car-controller/find-all-cars';
import { FindAllCars$Params } from '../fn/car-controller/find-all-cars';
import { findAllOwnerCars } from '../fn/car-controller/find-all-owner-cars';
import { FindAllOwnerCars$Params } from '../fn/car-controller/find-all-owner-cars';
import { findAllRentedOwnerCars } from '../fn/car-controller/find-all-rented-owner-cars';
import { FindAllRentedOwnerCars$Params } from '../fn/car-controller/find-all-rented-owner-cars';
import { findAllReturnedOwnerCars } from '../fn/car-controller/find-all-returned-owner-cars';
import { FindAllReturnedOwnerCars$Params } from '../fn/car-controller/find-all-returned-owner-cars';
import { findCarById } from '../fn/car-controller/find-car-by-id';
import { FindCarById$Params } from '../fn/car-controller/find-car-by-id';
import { getUsername } from '../fn/car-controller/get-username';
import { GetUsername$Params } from '../fn/car-controller/get-username';
import { PageResponseCarRentedResponse } from '../models/page-response-car-rented-response';
import { PageResponseCarResponse } from '../models/page-response-car-response';
import { rentCar } from '../fn/car-controller/rent-car';
import { RentCar$Params } from '../fn/car-controller/rent-car';
import { returnCar } from '../fn/car-controller/return-car';
import { ReturnCar$Params } from '../fn/car-controller/return-car';
import { saveCar } from '../fn/car-controller/save-car';
import { SaveCar$Params } from '../fn/car-controller/save-car';
import { updateArchivedStatus } from '../fn/car-controller/update-archived-status';
import { UpdateArchivedStatus$Params } from '../fn/car-controller/update-archived-status';
import { updateShareableStatus } from '../fn/car-controller/update-shareable-status';
import { UpdateShareableStatus$Params } from '../fn/car-controller/update-shareable-status';
import { uploadCarImage } from '../fn/car-controller/upload-car-image';
import { UploadCarImage$Params } from '../fn/car-controller/upload-car-image';

@Injectable({ providedIn: 'root' })
export class CarControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `findAllCars()` */
  static readonly FindAllCarsPath = '/car';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllCars()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllCars$Response(params?: FindAllCars$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseCarResponse>> {
    return findAllCars(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllCars$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllCars(params?: FindAllCars$Params, context?: HttpContext): Observable<PageResponseCarResponse> {
    return this.findAllCars$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseCarResponse>): PageResponseCarResponse => r.body)
    );
  }

  /** Path part for operation `saveCar()` */
  static readonly SaveCarPath = '/car';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `saveCar()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveCar$Response(params: SaveCar$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return saveCar(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `saveCar$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveCar(params: SaveCar$Params, context?: HttpContext): Observable<number> {
    return this.saveCar$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `rentCar()` */
  static readonly RentCarPath = '/car/rent/{car_id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `rentCar()` instead.
   *
   * This method doesn't expect any request body.
   */
  rentCar$Response(params: RentCar$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return rentCar(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `rentCar$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  rentCar(params: RentCar$Params, context?: HttpContext): Observable<number> {
    return this.rentCar$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `returnCar()` */
  static readonly ReturnCarPath = '/car/rent/return/{car_id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `returnCar()` instead.
   *
   * This method doesn't expect any request body.
   */
  returnCar$Response(params: ReturnCar$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return returnCar(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `returnCar$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  returnCar(params: ReturnCar$Params, context?: HttpContext): Observable<number> {
    return this.returnCar$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `approveReturnedCar()` */
  static readonly ApproveReturnedCarPath = '/car/rent/return/approve/{car_id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `approveReturnedCar()` instead.
   *
   * This method doesn't expect any request body.
   */
  approveReturnedCar$Response(params: ApproveReturnedCar$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return approveReturnedCar(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `approveReturnedCar$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  approveReturnedCar(params: ApproveReturnedCar$Params, context?: HttpContext): Observable<number> {
    return this.approveReturnedCar$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `uploadCarImage()` */
  static readonly UploadCarImagePath = '/car/img/{car_id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `uploadCarImage()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  uploadCarImage$Response(params: UploadCarImage$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return uploadCarImage(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `uploadCarImage$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  uploadCarImage(params: UploadCarImage$Params, context?: HttpContext): Observable<{
}> {
    return this.uploadCarImage$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `updateShareableStatus()` */
  static readonly UpdateShareableStatusPath = '/car/shareable/{car_id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateShareableStatus()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateShareableStatus$Response(params: UpdateShareableStatus$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return updateShareableStatus(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateShareableStatus$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateShareableStatus(params: UpdateShareableStatus$Params, context?: HttpContext): Observable<number> {
    return this.updateShareableStatus$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `updateArchivedStatus()` */
  static readonly UpdateArchivedStatusPath = '/car/archived/{car_id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateArchivedStatus()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateArchivedStatus$Response(params: UpdateArchivedStatus$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return updateArchivedStatus(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateArchivedStatus$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateArchivedStatus(params: UpdateArchivedStatus$Params, context?: HttpContext): Observable<number> {
    return this.updateArchivedStatus$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `findCarById()` */
  static readonly FindCarByIdPath = '/car/{car_id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findCarById()` instead.
   *
   * This method doesn't expect any request body.
   */
  findCarById$Response(params: FindCarById$Params, context?: HttpContext): Observable<StrictHttpResponse<CarResponse>> {
    return findCarById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findCarById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findCarById(params: FindCarById$Params, context?: HttpContext): Observable<CarResponse> {
    return this.findCarById$Response(params, context).pipe(
      map((r: StrictHttpResponse<CarResponse>): CarResponse => r.body)
    );
  }

  /** Path part for operation `getUsername()` */
  static readonly GetUsernamePath = '/car/user';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getUsername()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUsername$Response(params?: GetUsername$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return getUsername(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getUsername$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUsername(params?: GetUsername$Params, context?: HttpContext): Observable<string> {
    return this.getUsername$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `findAllReturnedOwnerCars()` */
  static readonly FindAllReturnedOwnerCarsPath = '/car/returned';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllReturnedOwnerCars()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllReturnedOwnerCars$Response(params?: FindAllReturnedOwnerCars$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseCarRentedResponse>> {
    return findAllReturnedOwnerCars(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllReturnedOwnerCars$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllReturnedOwnerCars(params?: FindAllReturnedOwnerCars$Params, context?: HttpContext): Observable<PageResponseCarRentedResponse> {
    return this.findAllReturnedOwnerCars$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseCarRentedResponse>): PageResponseCarRentedResponse => r.body)
    );
  }

  /** Path part for operation `findAllRentedOwnerCars()` */
  static readonly FindAllRentedOwnerCarsPath = '/car/rented';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllRentedOwnerCars()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllRentedOwnerCars$Response(params?: FindAllRentedOwnerCars$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseCarRentedResponse>> {
    return findAllRentedOwnerCars(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllRentedOwnerCars$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllRentedOwnerCars(params?: FindAllRentedOwnerCars$Params, context?: HttpContext): Observable<PageResponseCarRentedResponse> {
    return this.findAllRentedOwnerCars$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseCarRentedResponse>): PageResponseCarRentedResponse => r.body)
    );
  }

  /** Path part for operation `findAllOwnerCars()` */
  static readonly FindAllOwnerCarsPath = '/car/owner';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllOwnerCars()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllOwnerCars$Response(params?: FindAllOwnerCars$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseCarResponse>> {
    return findAllOwnerCars(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllOwnerCars$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllOwnerCars(params?: FindAllOwnerCars$Params, context?: HttpContext): Observable<PageResponseCarResponse> {
    return this.findAllOwnerCars$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseCarResponse>): PageResponseCarResponse => r.body)
    );
  }

}
