import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'hr-mat-star-rating',
  templateUrl: './mat-star-rating.component.html',
  styleUrls: ['./mat-star-rating.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class MatStarRatingComponent implements OnInit {

  @Input()
  rating: number;
  @Input()
  starCount: number;
  @Input()
  color: string;
  @Output()
  ratingUpdated = new EventEmitter();

  snackBarDuration = 2000;
  ratingArr = [];

  constructor(private snackBar: MatSnackBar) {
  }


  ngOnInit() {
    for (let index = 0; index < this.starCount; index++) {
      this.ratingArr.push(index);
    }
  }
  onClick(rating: number) {
    console.log(rating);
    this.snackBar.open('You rated ' + rating + ' / ' + this.starCount, '', {
      duration: this.snackBarDuration
    });
    this.ratingUpdated.emit(rating);
    return false;
  }

  showIcon(index: number) {
    if (this.rating >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }
}
export enum StarRatingColor {
  primary = 'primary',
  accent = 'accent',
  warn = 'warn'
}

