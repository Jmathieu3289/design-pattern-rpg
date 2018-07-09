declare var Crafty: any;

export abstract class UnitFactory {

  public static buildKnight(pointList: Array<Array<number>>) {
    const knight = Crafty.e('2D, Canvas, Motion, enemy_1, Collision, enemy').origin('center').collision(24,24,40,24,40,40,24,40);
    knight.currentPoint = 0;
    knight.pointList = pointList;
    knight.goalPoint = new Crafty.math.Vector2D(pointList[knight.currentPoint][0], pointList[knight.currentPoint][1]);
    knight.bind('UpdateFrame', function () {
      const distance = new Crafty.math.Vector2D(this.x, this.y).distanceSq(this.goalPoint);
      if (distance < 8) {
        this.currentPoint++;
        if (this.currentPoint == this.pointList.length) {
          this.destroy();      
        } else {
          this.goalPoint = new Crafty.math.Vector2D(this.pointList[this.currentPoint][0], this.pointList[this.currentPoint][1]);
          const angle = new Crafty.math.Vector2D(this.x, this.y).angleTo(this.goalPoint);
          this.rotation = Crafty.math.radToDeg(angle);
          this.vx = Math.cos(angle) * 100;
          this.vy = Math.sin(angle) * 100;
        }
      }
    });
    return knight;
  }

  public static buildOtherKnight() {
    const knight = Crafty.e('2D, Canvas, enemy_2').origin('center');
    knight.bind('UpdateFrame', function () {
      this.rotation++;
    });
    return knight;
  }

  public static buildTurret(x: number, y: number) {
    const turret = Crafty.e('2D, Canvas, enemy_2, turret').origin('center').attr({ x: x, y: y });
    turret.target = null;
    turret.canShoot = true;
    turret.bind('UpdateFrame', function () {
      const enemies = Crafty('enemy').get();
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
    const bullet = Crafty.e('2D, Canvas, Motion, Collision, bullet').origin('center').attr({ x: x, y: y }).collision(24,24,40,24,40,40,24,40);
    bullet.goalPoint = new Crafty.math.Vector2D(targetX, targetY);
    const angle = new Crafty.math.Vector2D(bullet.x,bullet.y).angleTo(bullet.goalPoint);
    bullet.rotation = Crafty.math.radToDeg(angle);
    bullet.vx = Math.cos(angle) * 500;
    bullet.vy = Math.sin(angle) * 500;
    bullet.bind('UpdateFrame', function () {
      if (!Crafty.viewport.onScreen(this)) {
        this.destroy();
      }
    });
    bullet.onHit('enemy', function (targets) {
      targets[0].obj.destroy();
      this.destroy();
    });
    return bullet;
  }

}
