import { Component, OnInit, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SchedulerService } from '../services/scheduler.service';
import { Schedule } from '../models/schedule';
import { Location } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Actor } from '../models/actor';
import { Theater } from '../models/theater';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';

/**
 * スケジュール編集 コンポーネント
 */
@Component({
  selector: 'app-schedule-detail',
  templateUrl: './schedule-detail.component.html',
  styleUrls: ['./schedule-detail.component.css'],
  providers: []
})
export class ScheduleDetailComponent implements OnInit {

  // 予定
  schedule: Schedule;
  // 舞台役者リスト
  actorList: Actor[];
  // 劇場リスト
  theaterList: Theater[];
  // 新しい予定か否か
  newSchedule: boolean;
  // 予定ID
  scheduleId: string;
  // 処理名（更新または登録）
  executionName: string;

  // font awesome
  faCalendar = faCalendar;

  /**
   * コンストラクタ
   * @param route DI ルーター
   * @param location DI ロケーション
   * @param scheService DI サービス
   * @param modalService モーダルダイアログ
   */
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private scheService: SchedulerService,
    private modalService: NgbModal) { }

  /**
   * 初期化
   */
  ngOnInit(): void {
    this.scheduleId = this.route.snapshot.paramMap.get('id');
    this.newSchedule = this.scheduleId === '_';
    console.log(this.newSchedule);
    if (this.newSchedule === true) {
      this.initSchedule();
      this.executionName = '作成';
      console.log('作成');
    } else {
      this.getSchedule();
      this.executionName = '更新';
      console.log('更新');
    }
  }

  /**
   * 予定初期化
   */
  initSchedule(): void {
    this.schedule = new Schedule();
    this.schedule.actor = new Actor();
    this.schedule.theater = new Theater();
    this.scheService.getActors().subscribe(actors => this.actorList = actors);
    this.scheService.getTheaters().subscribe(theaters => this.theaterList = theaters);
  }

  /**
   * 予定取得
   */
  getSchedule(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.scheService.getSchedule(id).subscribe(schedule => this.schedule = schedule);
    this.scheService.getActors().subscribe(actors => this.actorList = actors);
    this.scheService.getTheaters().subscribe(theaters => this.theaterList = theaters);
  }

  /**
   * 前の画面に戻る
   */
  goBack(): void {
    this.location.back();
  }

  /**
   * 劇場選択画面を表示
   * @param content モーダルダイアログ
   */
  openTheaterList(content): void {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.scheService.getTheater(result).subscribe(theater => this.schedule.theater = theater);
    }, (reason) => {
      console.log(`Dismissed: ${reason}`);
    });
  }

  /**
   * 舞台役者選択画面を表示
   * @param content モーダルダイアログ
   */
  openActorList(content): void {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.scheService.getActor(result).subscribe(actor => this.schedule.actor = actor);
    }, (reason) => {
      console.log(`Dismissed: ${reason}`);
    });
  }

  /**
   * 登録または更新処理
   */
  execute(): void {
    if (this.newSchedule === true) {
      this.scheService.createSchedule(this.schedule).subscribe(theater => { });
    } else {
      this.scheService.updateSchedule(this.schedule).subscribe(theater => { });
    }
    this.goBack();
  }

}
