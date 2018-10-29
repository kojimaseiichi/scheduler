import { Component, OnInit } from '@angular/core';
import { Schedule } from '../models/schedule';
import { faEdit, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { SchedulerService } from '../services/scheduler.service';
import { Router } from '@angular/router';

/**
 * 予定コンポーネント
 */
@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  // 予定一覧
  schedules: Schedule[];

  // font awesome
  faPlus = faPlus;
  faEdit = faEdit;
  faTrash = faTrash;

  /**
   * コンストラクタ
   * @param scheService DI サービス
   * @param router DI ルーター
   */
  constructor(private scheService: SchedulerService, private router: Router) { }

  /**
   * 初期化
   */
  ngOnInit(): void {
    this.getSchedule();
  }

  /**
   * 予定を取得
   */
  getSchedule(): void {
    // 日付の降順で並び替え
    this.scheService.getSchedules()
      .subscribe(schedules => this.schedules = schedules.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
  }

  /**
   * 予定変種画面へ遷移
   */
  onAddSchedule(): void {
    this.router.navigate(['schedules', 'detail', '_']);
  }

  /**
   * 予定ID
   * @param id 削除する予定ID
   */
  onDeleteSchedule(id): void {
    console.log(`delete schedule of (${id})`);
    this.scheService.deleteSchedule(id).subscribe(schedule => { });
    this.schedules = this.schedules.filter(x => x._id !== id);
  }
}
