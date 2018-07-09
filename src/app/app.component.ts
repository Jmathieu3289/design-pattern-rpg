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

  ngOnInit() {
    this.engine = new Engine(256, 256, 'game');
  }

  public killDude(): void {
    this.engine.enterScene('Stage_2');
  }

  public reviveDude(): void {
    this.engine.enterScene('Stage_1');
  }

}
