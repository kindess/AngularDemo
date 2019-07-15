import { Component, OnInit , Input } from '@angular/core';
import {Hero} from '../hero';

/**
 * 支持路由的方式获取hero对象：
 *    获取创建本组件的路由，
 *    从这个路由中提取出 id
 *    通过 HeroService 从服务器上获取具有这个 id 的英雄数据。
 */
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  // 接收属性（获取从其他组件输入）
  // @Input() hero: Hero
  hero: Hero;
  // 依赖注入
  constructor(private route: ActivatedRoute,
              private heroService: HeroService,
              private location: Location) { }

  ngOnInit() {
    this.getHero();
  }

  /**
   * route.snapshot 是一个路由信息的静态快照，抓取自组件刚刚创建完毕之后。
   * paramMap 是一个从 URL 中提取的路由参数值的字典。 "id" 对应的值就是要获取的英雄的 id。
   * 路由参数总会是字符串。 JavaScript 的 (+) 操作符会把字符串转换成数字，英雄的 id 就是数字类型。
   */
  getHero(): void {
    // 获取routeLink中的参数id
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  // 保持页面修改
  /**
   * 它使用英雄服务中的 updateHero() 方法来保存对英雄名字的修改，然后导航回前一个视图。
   */
  save(): void {
    this.heroService.updateHero(this.hero)
      .subscribe(() => this.goBack());
  }

  // 返回
  goBack(): void {
    history.back();
    // this.location.back();
  }
}
