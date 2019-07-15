import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HeroesComponent} from './heroes/heroes.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {HeroDetailComponent} from './hero-detail/hero-detail.component';

/**
 * 定义路由规则
 * Route必须包含path，component：
 *    path：一个用于匹配浏览器地址栏中 URL 的字符串。
 *    component：当导航到此路由时，路由器应该创建哪个组件。
 */
const routes: Routes = [
  // 访问localhost:4200/heroes 创建组件 HeroesComponent
  { path: 'heroes', component: HeroesComponent },
  { path: 'dashboard', component: DashboardComponent },
  // 根路径重定向到/dashboard路径
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  // 通过访问类似~/detail/11 的 URL。  path 中的冒号（:）表示 :id 是一个占位符，它表示某个特定英雄的 id。
  { path: 'detail/:id', component: HeroDetailComponent },
];

// @NgModule标记为路由模块
@NgModule({
  /**
   * 通常不会在路由模块中声明组件，
   * 所以可以删除 @NgModule.declarations 并删除对 CommonModule 的引用。
   */
  imports: [
    // CommonModule
    // 初始化路由器，并让它开始监听浏览器中的地址变化。
    RouterModule.forRoot(routes)

  ],
  declarations: [],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
