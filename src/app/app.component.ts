import { Component, OnInit } from '@angular/core';

declare var Crafty: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  private knight: any;

  ngOnInit() {
    Crafty.init(256, 256, document.getElementById('game'));

    const assetsObj = {
      'sprites': {
        '/assets/spritesheets/knight.png': {
          tile: 64,
          tileh: 64,
          paddingX: 0,
          paddingY: 1,
          map: {
            walk_right_start: [0, 11],
            dying_start: [0, 20]
          }
        }
      }
    };
    Crafty.load(assetsObj, () => {
      this.knight = Crafty.e('2D, Canvas, walk_right_start, SpriteAnimation').attr({ y: 20, w: 256, h: 256 });
      this.knight.reel('walking', 900, [
        [0, 11], [1, 11], [2, 11], [3, 11], [4, 11], [5, 11], [6, 11], [7, 11]
      ]);
      this.knight.reel('dying', 900, [
        [0, 20], [1, 20], [2, 20], [3, 20], [4, 20], [5, 20]
      ]);
      this.reviveDude();
    });
  }

  public killDude(): void {
    this.knight.x = -10;
    this.knight.animate('dying');
  }

  public reviveDude(): void {
    this.knight.x = 0;
    this.knight.animate('walking', -1);
  }

}
