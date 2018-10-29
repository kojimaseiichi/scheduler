import { Actor } from './actor';
import { Theater } from './theater';

/**
 * 予定モデル
 */
export class Schedule {
    _id: string;
    date: Date;
    actor: Actor;
    theater: Theater;
}
