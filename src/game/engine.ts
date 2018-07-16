import { AssetLoader } from "./asset-loader";
import { UnitFactory } from "./unit-factory";
import { TravelPath } from "./travel-path";
import { WaveSpawner } from "./wave-spawner";

declare var Crafty: any;

export class Engine {

  public travelPath: TravelPath;

  public lives: number = 100;
  public livesText: any;

  public wavesText: any;

  public waveSpawner: WaveSpawner = new WaveSpawner(10, 10);

  constructor(width = 256, height = 256, id = 'game') {

    Crafty.init(width, height, document.getElementById(id));
    Crafty.background('#2ecc71');
    this.livesText = Crafty.e('2D, Canvas, Persist, Text')
      .attr({
        x: 10,
        y: 10
      }).text('HP: ' + this.lives);
    
    this.wavesText = Crafty.e('2D, Canvas, Persist, Text')
      .attr({
        x: 100,
        y: 10
      }).text('Wave: ' + (this.waveSpawner.currentWave + 1) + '/' + this.waveSpawner.waves.length);

    Crafty.load(AssetLoader.loadAssets(), () => {
      this.loadTravelPath();
    });

    Crafty.bind('EnemyExited', () => {
      this.lives--;
      this.livesText.text('HP:' + this.lives);
      if (this.lives <= 0) {
        console.log('I Lost :(.');
      }
    });

    Crafty.bind('CreateEnemy', (data: any) => {
      UnitFactory.getInstance().buildEnemy(this.travelPath);
    });

    Crafty.bind('WaveOver', () => {
      setTimeout(() => {
        this.wavesText.text('Wave: ' + (this.waveSpawner.currentWave + 1) + '/' + this.waveSpawner.waves.length);
        this.waveSpawner.startWave();
      }, 5000);
    });

  }

  private loadTravelPath(): void {
    TravelPath.loadFromJSON('/assets/levels/basic/basic-level.json').then(tp => {
      this.travelPath = tp;
      this.loadScenes();
      this.enterScene('Stage_1');
    });
  }

  private loadScenes(): void {
    Crafty.scene('Stage_1', () => {
      this.waveSpawner.startWave();
    });
    Crafty.scene('Stage_2', function () {
    });
  }

  public enterScene(scene: string): void {
    Crafty.scene(scene);
    Crafty.e('2D, Canvas, Mouse').attr({ x: 0, y: 0, w: 256, h: 256 }).bind('Click', function (e) {
      UnitFactory.getInstance().buildTurret(e.realX-32, e.realY-32);
    });
  }

}
