import { Component, OnInit } from '@angular/core';

// 导入定义的hero类。{花括号中填写类名}
import {Hero} from '../hero';
import {HEROES} from '../mock-hero';
import {HeroService} from '../hero.service';
// 导入Observable（可观察对象）
import { Observable, of } from 'rxjs';


@Component({
  selector: 'app-heroes',
  /**
   * 当 Angular 发现某个组件依赖某个服务时，它会首先检查是否该注入器中已经有了那个服务的任何现有实例。
   * 如果所请求的服务尚不存在，注入器就会使用以前注册的服务提供商来制作一个，并把它加入注入器中，然后把该服务返回给 Angular。
   */
  providers: [HeroService], // 服务提供者
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
  // selectedHero: Hero;
  heroes: Hero[];
  // 依赖注入heroService服务
  constructor(private heroService: HeroService) { }

  /**
   * ngOnInit 是一个生命周期钩子，Angular 在创建完组件实例后很快就会调用 ngOnInit
   */
  ngOnInit() {
    // 调用方法，获取数据
    this.getHeroes();
  }

  // 定义方法
/*  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }*/
  // 调用heroService服务方法（同步获取数据）
/*  getHeroes(): void {
    this.heroes = this.heroService.getHeroes();
  }*/

  // 异步函数签名
  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  // 添加英雄
  add(name: string): void {
    // 判空（null,undefined、""等等）
    name = name.trim();
    if (!name) { return; }
    // TODO : { name } as Hero ？
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  // 删除
  delete(hero: Hero): void {
    // filter数组筛选方法，筛选出不是当前hero的其他所有
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }
}
