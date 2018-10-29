import { Component, OnInit } from '@angular/core';
import { Theater } from '../models/theater';
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { SchedulerService } from '../services/scheduler.service';
import { Router } from '@angular/router';

/**
 * 劇場 コンポーネント
 */
@Component({
  selector: 'app-theaters',
  templateUrl: './theaters.component.html',
  styleUrls: ['./theaters.component.css']
})
export class TheatersComponent implements OnInit {

  // 劇場一覧
  theaters: Theater[];

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
    this.getTheaters();
  }

  /**
   * 劇場を取得
   */
  getTheaters(): void {
    this.scheService.getTheaters().subscribe(theaters => this.theaters = theaters.sort((a, b) => a.name.localeCompare(b.name)));
  }

  /**
   * 劇場編集画面に遷移
   */
  onAddTheater(): void {
    this.router.navigate(['theaters', 'detail', '_']);
  }

  // 劇場を削除
  onDeleteTheater(id): void {
    console.log(`delete theater of (${id})`);
    this.scheService.deleteTheater(id).subscribe(theater => { });
    this.theaters = this.theaters.filter(x => x._id !== id);
  }
}
