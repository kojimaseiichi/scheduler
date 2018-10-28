import { Actor } from './actor';
import { Theater } from './theater';

export class Schedule {
    _id: string;
    date: Date;
    actor: Actor;
    theater: Theater;
}
