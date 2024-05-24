/* tslint:disable */
/* eslint-disable */
import { CarResponse } from '../models/car-response';
export interface PageResponseCarResponse {
  content?: Array<CarResponse>;
  first?: boolean;
  last?: boolean;
  number?: number;
  size?: number;
  totalElements?: number;
  totalPages?: number;
}
