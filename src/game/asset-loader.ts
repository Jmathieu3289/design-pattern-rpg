export abstract class AssetLoader {
  public static loadAssets(): object {
    const assetsObj = {
      'sprites': {
        '/assets/spritesheets/tilesheet.png': {
          tile: 64,
          tileh: 64,
          map: {
            enemy_1: [15, 10],
            enemy_2: [16, 10],
            enemy_3: [17, 10],
            enemy_4: [18, 10],
            turret_1: [19, 10],
            bullet: [22, 11]
          }
        }
      }
    };
    return assetsObj;
  }
}
