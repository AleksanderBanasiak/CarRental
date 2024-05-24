import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent {


  @Input()
  rating: number = 0;
  maxRating: number = 5;

  get fullStars(){
    return Math.floor(this.rating);
  }

  get halfStar(): boolean {
    return this.rating % 1 !== 0;
  }

  get emptyStar(): number {
    return this.maxRating - Math.ceil(this.rating);
  }

}
