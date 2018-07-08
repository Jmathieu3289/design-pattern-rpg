import { Component, OnInit } from '@angular/core';
import { Engine } from '../game/engine';
import { UnitFactory } from '../game/unit-factory';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public engine: Engine;
  public knight;

  ngOnInit() {
    this.engine = new Engine(256, 256, 'game');
    this.knight = UnitFactory.buildKnight();
    this.knight.bind("AnimationEnd", (reel) => {
      if (reel.id == 'reviving') {
        this.knight.animate('standing', -1);
      }
    });
  }

  public killDude(): void {
    this.knight.animate('dying');
  }

  public reviveDude(): void {
    this.knight.animate('reviving');
  }

}
