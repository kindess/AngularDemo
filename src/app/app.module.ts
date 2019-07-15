/* Angular根模块，告诉Angular如何组装应用 */

// 浏览器解析模块
import { BrowserModule } from '@angular/platform-browser';
// Angular的核心模块
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here

// 导入HttpClient远程服务器通讯模块
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

// 导入根组件。
// "./app.component"，"./"表示当前目录，加载同目录下的app.component.ts文件中的组件"AppComponent"
import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import {HeroService} from './hero.service';
import { HeroSearchComponent } from './hero-search/hero-search.component';

/**
 * 文件app.module.ts导入了应用所需的所有组件
 */
@NgModule({
  // 导入内部自定义组件
  declarations: [
    AppComponent,
    // 使用命令ng generate component heroes创建模块之后，被自动添加到这里了
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    DashboardComponent,
    HeroSearchComponent,
  ],
  // 导入外部组件
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,

// The HttpClientInMemoryWebApiModule module intercepts HTTP requests
// and returns simulated server responses.
// Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  /**
   * 添加的服务要引入app.module.ts，并加入到providers中。
   * 服务能被本应用中的任何部分使用，也可以在组件级别指定服务提供商，这通常是首选方式。
   */
  providers: [],
  // 它是应用中所有其它视图的宿主。只有根模块才应该设置这个 bootstrap 属性。
  bootstrap: [AppComponent]
})
export class AppModule { }
