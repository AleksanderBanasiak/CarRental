/* tslint:disable */
/* eslint-disable */
import { CarRentedResponse } from '../models/car-rented-response';
export interface PageResponseCarRentedResponse {
  content?: Array<CarRentedResponse>;
  first?: boolean;
  last?: boolean;
  number?: number;
  size?: number;
  totalElements?: number;
  totalPages?: number;
}
