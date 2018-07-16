import { Enemy } from "./enemy";
import { TravelPath } from "./travel-path";

declare var Crafty: any;

export class UnitFactory {

  private static _instance: UnitFactory;

  private constructor() {
    this.createComponents();
  }

  private createComponents(): void {
    this.createEnemyComponent();
    this.createBulletComponent();
  }

  private createEnemyComponent(): void {
    Crafty.c('Enemy', {
      required: '2D, Canvas, Motion, Collision',

      init: function () {
        this.origin('center').collision(24, 24, 40, 24, 40, 40, 24, 40);
        this.currentPoint = 0;
        this.travelPath = null;
      },

      events: {
        "UpdateFrame": function () {
          
          if (this.travelPath == null) {
            return;
          }

          const distance = new Crafty.math.Vector2D(this.x, this.y).distanceSq(this.goalPoint);
          if (distance < 8) {
            this.currentPoint++;
            if (this.currentPoint == this.travelPath.getPath().length) {
              Crafty.trigger('EnemyExited');
              this.destroy();
            } else {
              this.goalPoint = this.travelPath.getPoint(this.currentPoint).toCraftyVector2D();
            }
          } else {
            const angle = new Crafty.math.Vector2D(this.x, this.y).angleTo(this.goalPoint);
            this.rotation = Crafty.math.radToDeg(angle);
            this.vx = Math.cos(angle) * 100;
            this.vy = Math.sin(angle) * 100;
          }

        }
      },

      setTravelPath: function (travelPath: TravelPath): any {
        this.travelPath = travelPath;
        this.currentPoint = 0;
        this.goalPoint = this.goalPoint = travelPath.getPoint(this.currentPoint).toCraftyVector2D();
        return this;
      }

    });
  }

  private createBulletComponent(): void {
    Crafty.c('Bullet', {
      required: '2D, Canvas, Motion, Collision',

      init: function() {
        this.collision(24, 24, 40, 24, 40, 40, 24, 40);

        this.onHit('Enemy', function (targets) {
          targets[0].obj.destroy();
          this.destroy();
        });
      },

      events: {
        "UpdateFrame": function () {
          if (!Crafty.viewport.onScreen(this)) {
            this.destroy();
          }
        }
      },

      place: function (x: number, y: number): any {
        this.x = x;
        this.y = y;
        this.origin('center');
        return this;
      },

      setGoalPoint: function (x: number, y: number): any {
        this.goalPoint = new Crafty.math.Vector2D(x, y);
        let angle: number = new Crafty.math.Vector2D(this.x, this.y).angleTo(this.goalPoint);
        this.rotation = Crafty.math.radToDeg(angle);
        this.vx = Math.cos(angle) * 900;
        this.vy = Math.sin(angle) * 900;
        return this;
      }

    });
  }

  public static getInstance(): UnitFactory {
    if (this._instance == null) {
      this._instance = new UnitFactory();
    }
    return this._instance;
  }

  public buildEnemy(travelPath: TravelPath) {
    let enemy: Enemy = new Enemy(travelPath);
    return enemy;
  }

  public buildTurret(x: number, y: number) {
    const turret = Crafty.e('2D, Canvas, enemy_2, turret').origin('center').attr({ x: x, y: y });
    turret.target = null;
    turret.canShoot = true;
    turret.bind('UpdateFrame', function () {
      const enemies = Crafty('Enemy').get();
      const target = enemies && enemies.length > 0 ? enemies.sort((a, b) => {
        return new Crafty.math.Vector2D(a.x, a.y).distanceSq(new Crafty.math.Vector2D(this.x, this.y)) - new Crafty.math.Vector2D(b.x, b.y).distanceSq(new Crafty.math.Vector2D(this.x, this.y));
      })[0] : null;
      if (target != null) {
        const targetVector = new Crafty.math.Vector2D(target.x, target.y);
        const angle = new Crafty.math.Vector2D(this.x, this.y).angleTo(targetVector);
        this.rotation = Crafty.math.radToDeg(angle);       
        if (this.canShoot) {
          this.canShoot = false;
          UnitFactory.buildBullet(this.x, this.y, targetVector.x, targetVector.y);
          setTimeout(() => { this.canShoot = true; }, 500);
        }
      }
    });
    return turret;
  }

  public static buildBullet(x: number, y: number, targetX: number, targetY: number) {
    const bullet = Crafty.e('Bullet, bullet_1').place(x, y).setGoalPoint(targetX, targetY);
    return bullet;
  }

}
