import { AssetLoader } from "./asset-loader";
import { UnitFactory } from "./unit-factory";

declare var Crafty: any;

export class Engine {

  public pointList: Array<Array<number>> = [[0,0], [200, 0], [200, 128], [0, 128]];

  constructor(width = 256, height = 256, id = 'game') {
    Crafty.init(width, height, document.getElementById(id));
    Crafty.background('#2ecc71');
    Crafty.load(AssetLoader.loadAssets(), () => {
      this.loadScenes();
      this.enterScene('Stage_1');
    });
  }

  private loadScenes(): void {
    Crafty.scene('Stage_1', () => {
      setInterval(() => {
        UnitFactory.buildKnight(this.pointList);
      }, 100);
    });
    Crafty.scene('Stage_2', function () {
      UnitFactory.buildOtherKnight();
    });
  }

  public enterScene(scene: string): void {
    Crafty.scene(scene);
    Crafty.e('2D, Canvas, Mouse').attr({ x: 0, y: 0, w: 256, h: 256 }).bind('Click', function (e) {
      UnitFactory.buildTurret(e.realX-32, e.realY-32);
    });
  }

}
