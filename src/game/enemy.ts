import { TravelPath } from "./travel-path";

declare var Crafty: any;

export class Enemy {

  public component: any;

  private hp: number = 100;
  private speed: number = 100;

  constructor(travelPath: TravelPath) {
    this.init(travelPath);
  }

  private init(travelPath: TravelPath): void {
    this.component = Crafty.e('Enemy, enemy_1').origin('center').collision(24, 24, 40, 24, 40, 40, 24, 40).setTravelPath(travelPath);
  }

}