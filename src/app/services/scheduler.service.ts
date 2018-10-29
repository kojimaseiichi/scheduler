import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Actor } from '../models/actor';
import { Observable } from 'rxjs';
import { Theater } from '../models/theater';
import { Schedule } from '../models/schedule';

/**
 * HTTPヘッダー（更新処理用）
 */
const headerOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

/**
 * DIサービスクラス
 */
@Injectable({
  providedIn: 'root'
})
export class SchedulerService {

  // 舞台役者操作APIのベースアドレス
  actorsApi = '/api/actors';
  // 劇場操作APIのベースアドレス
  theaterApi = '/api/theaters';
  // 予定操作APIのベースアドレス
  schedulesApi = '/api/schedules';

  /**
   * コンストラクタ
   * @param http DI HTTPクライアント
   */
  constructor (
    private http: HttpClient
  ) { }

  // CRUD操作 Actor

  countActor(): Observable<number> {
    console.log('count actors');
    return this.http.get<number>(this.actorsApi + '/count');
  }

  getActors(): Observable<Actor[]> {
    console.log('select all actors');
    return this.http.get<Actor[]>(this.actorsApi);
  }

  getActor(id: string): Observable<Actor> {
    console.log('select one actor');
    const url = `${this.actorsApi}/${id}`;
    return this.http.get<Actor>(url);
  }

  createActor(actor: Actor): Observable<Actor> {
    console.log('insert one actor');
    return this.http.post<Actor>(this.actorsApi, actor, headerOptions);
  }

  updateActor(actor: Actor): Observable<any> {
    console.log('update one actor');
    const url = `${this.actorsApi}/${actor._id}`;
    return this.http.put<Actor>(url, actor, headerOptions);
  }

  deleteActor(id: string): Observable<Actor> {
    console.log('delete one actor');
    const url = `${this.actorsApi}/${id}`;
    return this.http.delete<Actor>(url);
  }


  // CRUD操作 Theater

  countTheaters(): Observable<number> {
    console.log('count theaters');
    return this.http.get<number>(this.theaterApi + '/count');
  }

  getTheaters(): Observable<Theater[]> {
    console.log('select all theaters');
    return this.http.get<Theater[]>(this.theaterApi);
  }

  getTheater(id: string): Observable<Theater> {
    console.log('select one theater');
    const url = `${this.theaterApi}/${id}`;
    return this.http.get<Theater>(url);
  }

  createTheater(theater: Theater): Observable<Theater> {
    console.log('insert one theater');
    return this.http.post<Theater>(this.theaterApi, theater, headerOptions);
  }

  updateTheater(theater: Theater): Observable<Theater> {
    console.log('update one theater');
    const url = `${this.theaterApi}/${theater._id}`;
    return this.http.put<Theater>(url, theater, headerOptions);
  }

  deleteTheater(id: string): Observable<Theater> {
    console.log('delete one theater');
    const url = `${this.theaterApi}/${id}`;
    return this.http.delete<Theater>(url);
  }


  // CRUD操作 Schedule

  countSchedules(): Observable<number> {
    console.log('count schedules');
    return this.http.get<number>(this.schedulesApi + '/count');
  }

  getFutureSchedules(): Observable<Schedule[]> {
    console.log('select all future schedules');
    return this.http.get<Schedule[]>(this.schedulesApi + '/future');
  }

  getSchedules(): Observable<Schedule[]> {
    console.log('select all schedules');
    return this.http.get<Schedule[]>(this.schedulesApi);
  }

  getSchedule(id: string): Observable<Schedule> {
    console.log('select one schedule');
    const url = `${this.schedulesApi}/${id}`;
    return this.http.get<Schedule>(url);
  }

  createSchedule(schedule: Schedule): Observable<Schedule> {
    console.log('insert one schedule');
    return this.http.post<Schedule>(this.schedulesApi, schedule, headerOptions);
  }

  updateSchedule(schedule: Schedule): Observable<any> {
    console.log('update one schedule');
    const url = `${this.schedulesApi}/${schedule._id}`;
    return this.http.put<Schedule>(url, schedule, headerOptions);
  }

  deleteSchedule(id: string): Observable<Schedule> {
    console.log('delete one schedule');
    const url = `${this.schedulesApi}/${id}`;
    return this.http.delete<Schedule>(url);
  }

}
