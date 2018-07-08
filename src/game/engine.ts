import { AssetLoader } from "./asset-loader";
import { UnitFactory } from "./unit-factory";

declare var Crafty: any;

export class Engine {

  public width: 256;
  public height: 256;

  constructor(width = 256, height = 256, id = 'game') {
    Crafty.init(width, height, document.getElementById(id));
    Crafty.background('#000');
    Crafty.load(AssetLoader.loadAssets(), () => {
    });
  }
}
