declare var Crafty: any;

export class Vector2D {

  public x: number;
  public y: number;

  constructor(x: number = 0, y: number = 0) {
    this.x = x;
    this.y = y;
  }

  public toCraftyVector2D(): any {
    return new Crafty.math.Vector2D(this.x, this.y);
  }
  
}