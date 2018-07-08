declare var Crafty: any;

export abstract class UnitFactory {
  public static buildKnight() {
    const knight = Crafty.e('2D, Canvas, walk_right_start, SpriteAnimation').attr({ x: 0, y: 0, w: 256, h: 256 });
    knight.reel('standing', 900, [
      [0, 11]
    ]); 
    knight.reel('walking', 900, [
      [0, 11], [1, 11], [2, 11], [3, 11], [4, 11], [5, 11], [6, 11], [7, 11]
    ]);
    knight.reel('dying', 900, [
      [0, 20], [1, 20], [2, 20], [3, 20], [4, 20], [5, 20]
    ]);
    knight.reel('reviving', 900, [
      [5, 20], [4, 20], [3, 20], [2, 20], [1, 20], [0, 20]
    ]);
    knight.animate('standing', -1);
    return knight;
  }

}
