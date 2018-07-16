import { Vector2D } from "./vector-2d";

interface TravelPathData {
  path: Array<Vector2D>;
}

export class TravelPath {

  private path: Array<Vector2D>; 

  constructor(path: Array<Vector2D> = []) {
    this.path = path;
  }

  public getPath(): Array<Vector2D> {
    return this.path;
  }

  public getPoint(index: number): Vector2D {
    if (index < 0 || index > this.path.length - 1) {
      return null;
    } else {
      return this.path[index];
    }
  }

  public addPoint(x: number, y: number): void {
    this.path.push(new Vector2D(x, y));
  }

  public static loadFromJSON(path: string): Promise<TravelPath> {

    return fetch(path)
      .then((res) => {
        return res.json();
      }, (reason) => {
        return null;
      }).then((json) => {

        let travelPath: TravelPath = new TravelPath();
        if (json.path == null) {
          console.warn('Failed loading travel path from JSON: No path data');
        } else {
          travelPath.path = [];
          json.path.forEach(point => {
            travelPath.addPoint(point.x, point.y);
          });
        }
        return travelPath;
      });

  }
}