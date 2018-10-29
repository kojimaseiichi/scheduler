import { Component, OnInit, Input } from '@angular/core';
import { Actor } from '../models/actor';
import { SchedulerService } from '../services/scheduler.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

/**
 * 舞台役者編集コンポーネント
 */
@Component({
  selector: 'app-actor-detail',
  templateUrl: './actor-detail.component.html',
  styleUrls: ['./actor-detail.component.css']
})
export class ActorDetailComponent implements OnInit {

  // 舞台役者
  actor: Actor;
  // 新規登録か否か
  newActor: boolean;
  // 舞台役者ID
  actorId: string;
  // 処理名（登録または更新）
  executionName: string;

  /**
   * コンストラクタ
   * @param route DI ルーター
   * @param location DI URLロケーション
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
    this.actorId = this.route.snapshot.paramMap.get('id');
    this.newActor = this.actorId === '_';
    console.log(this.newActor);
    if (this.newActor === true) {
      this.actor = new Actor();
      this.executionName = '作成';
      console.log('作成');
    } else {
      this.getActor();
      this.executionName = '更新';
      console.log('更新');
    }
  }

  /**
   * 舞台役者を取得
   */
  getActor(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.scheService.getActor(id).subscribe(actor => this.actor = actor);
  }

  /**
   * 前の画面に戻る
   */
  goBack(): void {
    this.location.back();
  }

  /**
   * 更新または新規登録
   */
  execute(): void {

    if (this.newActor === true) {
      this.scheService.createActor(this.actor).subscribe(actor => { });
    } else {
      this.scheService.updateActor(this.actor).subscribe(actor => { });
    }
    this.goBack();
  }

}
