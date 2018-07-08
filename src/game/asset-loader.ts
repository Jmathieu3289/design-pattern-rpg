export abstract class AssetLoader {
  public static loadAssets(): object {
    const assetsObj = {
      'sprites': {
        '/assets/spritesheets/knight.png': {
          tile: 64,
          tileh: 64,
          paddingX: 0,
          paddingY: 0,
          map: {
            walk_right_start: [0, 11],
            dying_start: [0, 20]
          }
        }
      }
    };
    return assetsObj;
  }
}
