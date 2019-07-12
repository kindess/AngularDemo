import { Component, OnInit , Input } from '@angular/core';
import {Hero} from '../hero';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  // 接收属性
  @Input() hero: Hero
  constructor() { }

  ngOnInit() {
  }

}
