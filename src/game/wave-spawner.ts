import { TravelPath } from "./travel-path";

declare var Crafty: any;

export class WaveSpawner {

  private data = {

  };

  public x: number = 0;
  public y: number = 0;

  public currentWave: number = 0;
  public waves: Array<any> = [
    {
      timers: [
        {
          start: 0,
          count: 5,
          interval: 500
        }
      ]
    },
    {
      timers: [
        {
          start: 0,
          count: 20,
          interval: 500
        },
        {
          start: 3000,
          count: 20,
          interval: 25
        },
        {
          start: 5000,
          count: 500,
          interval: 1
        }
      ]
    }
  ];

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  public startWave() {
    
    if (this.currentWave >= this.waves.length) {
      return;
    }

    let waveData = this.waves[this.currentWave];
    let longestTimer = waveData.timers.sort((a, b) => {
      return (a.start + (a.count * a.interval)) - (b.start + (b.count * b.interval));
    })[0];

    for (let i = 0; i < waveData.timers.length; i++){
      setTimeout(() => {
        let timer = waveData.timers[i];
        let count = timer.count;
        let interval = setInterval(() => {
          count--;
          Crafty.trigger("CreateEnemy", { x: this.x, y: this.y });
          if (count == 0) {
            if (timer == longestTimer) {
              if (this.waves.length > this.currentWave+1) {
                this.currentWave++;
                Crafty.trigger("WaveOver");
              }
            }
            clearInterval(interval);
          }
        }, waveData.timers[i].interval);  
      }, waveData.timers[i].start);
    }
  }

}