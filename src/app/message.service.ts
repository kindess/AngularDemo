import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: string[] = [];
  constructor() { }
  // 获取信息
  add(message: string): void {
    this.messages.push(message);
  }
  // 清除数据
  clear() {
    this.messages = [];
  }
}
