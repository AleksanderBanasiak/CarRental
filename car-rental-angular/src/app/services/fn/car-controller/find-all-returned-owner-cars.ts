/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PageResponseCarRentedResponse } from '../../models/page-response-car-rented-response';

export interface FindAllReturnedOwnerCars$Params {
  page?: number;
  size?: number;
}

export function findAllReturnedOwnerCars(http: HttpClient, rootUrl: string, params?: FindAllReturnedOwnerCars$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseCarRentedResponse>> {
  const rb = new RequestBuilder(rootUrl, findAllReturnedOwnerCars.PATH, 'get');
  if (params) {
    rb.query('page', params.page, {});
    rb.query('size', params.size, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PageResponseCarRentedResponse>;
    })
  );
}

findAllReturnedOwnerCars.PATH = '/car/returned';
