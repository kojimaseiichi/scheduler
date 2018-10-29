import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

/**
 * ハートのレーティング
 */
@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {

  // 評価
  @Input()
  rating: number;

  // 評価変更通知
  @Output()
  ratingChange = new EventEmitter<number>();

  // 変更可否
  @Input()
  readonly: boolean;

  /**
   * コンストラクタ
   */
  constructor() {
    this.readonly = false;
  }

  /**
   * 初期化
   */
  ngOnInit(): void {
    if (!this.rating) {
      this.rating = 3;
    }
  }

  /**
   * 評価変更イベントハンドラ
   * @param value 変更後の評価
   */
  change(value): void {
    console.log(`value change ${value}`);
    this.rating = value;
    this.ratingChange.emit(this.rating);
  }

}
