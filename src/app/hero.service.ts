import { Injectable } from '@angular/core';

import {Hero} from './hero';
import {HEROES} from './mock-hero';
import {Observable, of} from 'rxjs';
// 信息服务
import {MessageService} from './message.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';

// 捕获服务器数据传输的异常
import { catchError, map, tap } from 'rxjs/operators';

// const类型的变量需要定义在装饰器之前，export导出的类必须在装饰器之前
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

// @Injectable标记为服务
@Injectable({
  providedIn: 'root'
})
export class HeroService {
  // 模拟的后台api访问路径
  private heroesUrl = 'api/heroes';  // URL to web api
  constructor( private http: HttpClient,
               private messageService: MessageService) { }

  // 返回模拟的数据（同步）
/*   getHeroes(): Hero[] {
    return HEROES;
  }*/

  // 返回模拟的数据（异步）
/*  getHeroes(): Observable<Hero[]> {
    this.messageService.add('HeroService: fetched heroes')
    return of(HEROES);
  }*/

  // 通过id查询数组中对象id为指定id的hero对象（找不到不会报错）
/*  getHero(id: number): Observable<Hero> {
    //  send the message _after_ fetching the hero
    // 注意，这里的反引号 ( ` ) 用于定义 JavaScript 的 模板字符串字面量，以便嵌入 id。
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(HEROES.find(hero => hero.id === id));
  }*/

  /** GET hero by id. Will 404 if id not found */
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

   /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  /** GET heroes from the server */
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      tap(_ => this.log('fetched heroes')),
      /**
       * catchError() 操作符会拦截失败的 Observable。
       * 它把错误对象传给错误处理器，错误处理器会处理这个错误。
       */
      catchError(this.handleError<Hero[]>('getHeroes', []))
    );
  }

  /**
   * 保存页面上的修改。注意：是调用的put方法，不是post
   */
  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  // 添加。注意：是调用的post方法，非put
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }
  // 删除
  /** DELETE: delete the hero from the server */
  deleteHero(hero: Hero | number): Observable<Hero> {
    // TODO: 三目运算符
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /* GET heroes whose name contains search term */
  searchHeroes(term: string): Observable<Hero[]> {
    // 如果没有搜索词，该方法立即返回一个空数组
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }
}
