import { Component, OnInit } from '@angular/core';

// 导入定义的hero类。{花括号中填写类名}
import {Hero} from '../hero';
import {HEROES} from '../mock-hero';
import {HeroService} from '../hero.service';
// 导入Observable（可观察对象）
import { Observable, of } from 'rxjs';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html', // 模板页面路径
  styleUrls: ['./heroes.component.css']   // 样式文件路径
})
// 始终要 export 这个组件类，以便在其它地方（比如 AppModule）导入它。
export class HeroesComponent implements OnInit {
  // 属性不应该在放在ngOnInit方法之后
  // hero = 'Windstorm';

  /**
   * 使用定义的hero类
   */
 /* hero: Hero = {
    id: 1,
    name: 'Windstorm'
  };*/
  // heros: Hero[] = HEROES;
  selectedHero: Hero;
  heroes: Hero[];
  // 注入heroService服务
  constructor(private heroService: HeroService) { }

  /**
   * ngOnInit 是一个生命周期钩子，Angular 在创建完组件实例后很快就会调用 ngOnInit
   */
  ngOnInit() {
    // 调用方法，获取数据
    this.getHeroes();
  }

  // 定义方法
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
  // 调用heroService服务方法（同步获取数据）
/*  getHeroes(): void {
    this.heroes = this.heroService.getHeroes();
  }*/

  // 异步函数签名
  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }
}
