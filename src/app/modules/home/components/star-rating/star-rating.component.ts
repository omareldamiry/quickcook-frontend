import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css']
})
export class StarRatingComponent implements OnChanges, OnInit {

  @Input() rating: number = 0;
  @Input() disabled: boolean = false;
  @Input() size: "medium" | "small" | "large" = "medium";
  @Input() displayLabel: boolean = true;
  stars: boolean[] = [false, false, false, false, false];
  value: number = 0;

  constructor() { }

  ngOnChanges(): void {
    this.value = this.rating;
    this.activateUntil(this.value);
  }

  ngOnInit(): void {
  }

  activateUntil(index: number = 0) {
    this.stars = [false, false, false, false, false];
    this.value = index;

    for (let i = 0; i < this.stars.length; i++) {
      if (i < index) {
        this.stars[i] = true;
      }
    }
  }

}
