/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CarResponse } from '../../models/car-response';

export interface FindCarById$Params {
  car_id: number;
}

export function findCarById(http: HttpClient, rootUrl: string, params: FindCarById$Params, context?: HttpContext): Observable<StrictHttpResponse<CarResponse>> {
  const rb = new RequestBuilder(rootUrl, findCarById.PATH, 'get');
  if (params) {
    rb.path('car_id', params.car_id, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<CarResponse>;
    })
  );
}

findCarById.PATH = '/car/{car_id}';