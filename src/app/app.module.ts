/* Angular根模块，告诉Angular如何组装应用 */

// 浏览器解析模块
import { BrowserModule } from '@angular/platform-browser';
// Angular的核心模块
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here

// 导入根组件。
// "./app.component"，"./"表示当前目录，加载同目录下的app.component.ts文件中的组件"AppComponent"
import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { AppRoutingModule } from './app-routing.module';

/**
 * 文件app.module.ts导入了应用所需的所有组件
 */
@NgModule({
  // 导入内部定义组件
  declarations: [
    AppComponent,
    // 使用命令ng generate component heroes创建模块之后，被自动添加到这里了
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent
  ],
  // 导入外部组件
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
