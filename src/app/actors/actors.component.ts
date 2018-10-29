import { Component, OnInit } from '@angular/core';
import { Actor } from '../models/actor';
import { faPlus, faEdit, faStar, faTrash } from '@fortawesome/free-solid-svg-icons';
import { SchedulerService } from '../services/scheduler.service';
import { Router } from '@angular/router';

/**
 * 役者一覧 コンポーネント
 */
@Component({
  selector: 'app-actors',
  templateUrl: './actors.component.html',
  styleUrls: ['./actors.component.css']
})
export class ActorsComponent implements OnInit {

  // 役者一覧
  actors: Actor[];

  // font awesome
  faPlus = faPlus;
  faEdit = faEdit;
  faStar = faStar;
  faTrash = faTrash;

  /**
   * コンストラクタ
   * @param scheService DI サービス
   * @param router DI ルーター
   */
  constructor(private scheService: SchedulerService, private router: Router) {
  }

  /**
   * 初期化
   */
  ngOnInit() {
    this.getActors();
  }

  /**
   * 舞台役者を取得
   */
  getActors() {
    this.scheService.getActors()
      .subscribe(actors => this.actors = actors.sort(
        (a, b) => {
          const c = a.lastName.localeCompare(b.lastName);
          if (c === 0) {
            return a.firstName.localeCompare(b.firstName);
          }
          return c;
        }));
  }

  /**
   * 舞台役者登録画面に遷移
   * 新規登録時はIDに_（アンダースコア）を設定
   */
  onAddActor() {
    this.router.navigate(['actors', 'detail', '_']);
  }

  /**
   * 舞台役者を削除
   * @param id 削除する舞台役者のID
   */
  onDeleteActor(id) {
    console.log(`delete actor of (${id})`);
    this.scheService.deleteActor(id).subscribe(actor => { });
    this.actors = this.actors.filter(x => x._id !== id);
  }
}
