import { Component, OnInit } from '@angular/core';
import { Theater } from '../models/theater';
import { ActivatedRoute } from '@angular/router';
import { SchedulerService } from '../services/scheduler.service';
import { Location } from '@angular/common';

/**
 * 劇場編集 コンポーネント
 */
@Component({
  selector: 'app-theater-detail',
  templateUrl: './theater-detail.component.html',
  styleUrls: ['./theater-detail.component.css']
})
export class TheaterDetailComponent implements OnInit {

  // 劇場
  theater: Theater;
  // 新規登録か否か
  newTheater: boolean;
  // 劇場ID
  theaterId: string;
  // 処理名（更新または作成）
  executionName: string;

  /**
   * コンストラクタ
   * @param route DI ルーター
   * @param location DI ロケーション
   * @param scheService DI サービス
   */
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    public scheService: SchedulerService) { }

  /**
   * 初期化
   */
  ngOnInit(): void {
    this.theaterId = this.route.snapshot.paramMap.get('id');
    this.newTheater = this.theaterId === '_';
    console.log(this.newTheater);
    if (this.newTheater === true) {
      this.theater = new Theater();
      this.executionName = '作成';
      console.log('作成');
    } else {
      this.getTheater();
      this.executionName = '更新';
      console.log('更新');
    }
  }

  /**
   * 劇場を取得
   */
  getTheater(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.scheService.getTheater(id).subscribe(theater => this.theater = theater);
  }

  /**
   * 前の画面に戻る
   */
  goBack(): void {
    this.location.back();
  }

  /**
   * 更新または登録
   */
  execute(): void {
    if (this.newTheater === true) {
      this.scheService.createTheater(this.theater).subscribe(theater => { });
    } else {
      this.scheService.updateTheater(this.theater).subscribe(theater => { });
    }
    this.goBack();
  }
}
