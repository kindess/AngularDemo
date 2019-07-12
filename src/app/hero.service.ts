import { Injectable } from '@angular/core';

import {Hero} from './hero';
import {HEROES} from './mock-hero';
import {Observable, of} from 'rxjs';
// 信息服务
import {MessageService} from './message.service';

// @Injectable标记为服务
@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private messageService: MessageService) { }

  // 返回模拟的数据（同步）
/*   getHeroes(): Hero[] {
    return HEROES;
  }*/

  // 返回模拟的数据（异步）
  getHeroes(): Observable<Hero[]> {
    this.messageService.add('HeroService: fetched heroes')
    return of(HEROES);
  }
}
