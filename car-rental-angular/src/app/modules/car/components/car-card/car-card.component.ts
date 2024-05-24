import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CarResponse} from "../../../../services/models/car-response";

@Component({
  selector: 'app-car-card',
  templateUrl: './car-card.component.html',
  styleUrls: ['./car-card.component.scss']
})
export class CarCardComponent {

  private _car: CarResponse = {};
  private _carImg: string | undefined;
  private _manage = false;


  get manage(): boolean {
    return this._manage;
  }

  @Input()
  set manage(value: boolean) {
    this._manage = value;
  }

  @Input()
  set car(value: CarResponse){
    this._car = value;
  }


  get carImg(): string | undefined {
    if(this._car.carImg){
      return 'data:image/jpg;base64, '+ this._car.carImg;
    }
    return 'https://source.unsplash.com/user/c_v_r/1900x800';
  }

  @Output() private share: EventEmitter<CarResponse> = new EventEmitter<CarResponse>;
  @Output() private archive: EventEmitter<CarResponse> = new EventEmitter<CarResponse>;
  @Output() private rent: EventEmitter<CarResponse> = new EventEmitter<CarResponse>;
  @Output() private addToWaitingList: EventEmitter<CarResponse> = new EventEmitter<CarResponse>;
  @Output() private edit: EventEmitter<CarResponse> = new EventEmitter<CarResponse>;
  @Output() private details: EventEmitter<CarResponse> = new EventEmitter<CarResponse>;

  get car(): CarResponse{
    return this._car;
  }

  onShowDetails() {
    this.details.emit(this._car);
  }

  onRent() {
    this.rent.emit(this._car);
  }

  onEdit() {
    this.edit.emit(this._car);
  }

  onShare() {
    this.share.emit(this._car);
  }

  onArchive() {
    this.archive.emit(this._car);
  }

  onAddToWaitingList() {
    this.addToWaitingList.emit(this._car);
  }
}
