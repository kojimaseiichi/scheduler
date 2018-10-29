import { Component, OnInit } from '@angular/core';
import { SchedulerService } from '../services/scheduler.service';
import { Schedule } from '../models/schedule';
import { Actor } from '../models/actor';

/**
 * ダッシュボード コンポーネント
 */
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // 舞台役者登録件数
  countActors: number;
  // 劇場登録件数
  countTheaters: number;
  // 今後の予定
  scheduleList: Schedule[];
  // 人気舞台役者
  goodActorList: Actor[];

  /**
   * コンストラクタ
   * @param scheService DI サービス
   */
  constructor(private scheService: SchedulerService) { }

  /**
   * 初期化
   */
  ngOnInit() {
    this.getActorCount();
    this.getTheaterCount();
    this.getScheduleList();
    this.getGoodActorList();
  }

  /**
   * 舞台役者の登録件数を要求
   */
  getActorCount(): void {
    this.scheService.countActor().subscribe(x => { this.countActors = x; });
  }

  /**
   * 劇場の登録件数を要求
   */
  getTheaterCount(): void {
    this.scheService.countTheaters().subscribe(x => { this.countTheaters = x; });
  }

  /**
   * 今後の予定を取得
   */
  getScheduleList(): void {
    this.scheService.getFutureSchedules().subscribe(x => { this.scheduleList = x; });
  }

  /**
   * 人気のある舞台俳優を取得
   */
  getGoodActorList(): void {
    this.scheService.getActors().subscribe(actors => {
      let maxRate = 0;
      actors.forEach(x => { maxRate = Math.max(maxRate, x.rating); });
      this.goodActorList = actors.filter(x => x.rating === maxRate);
    });
  }
}
