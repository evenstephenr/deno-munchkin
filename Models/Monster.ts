import { Surprise } from "./Surprise.ts";
import { generateRandomNumber } from "../util/Random.ts";

type MonsterOptions = {
  level?: number;
  strength?: number;
  speed?: number;
};

/**
 * Monsters can be found behind Doors
 * TODO:
 *  add personality to determine what happens if a Player cannot fight or run
 */
export class Monster implements Surprise {
  /** a Player's level must be >= in order to fight */
  level: number;
  /** a Player's strength must be >= in order to win a fight */
  strength: number;
  /** a Player's speed must be >= in order to run away */
  speed: number;

  constructor(props?: MonsterOptions) {
    this.level = props?.level || generateRandomNumber(1, 10);
    this.strength = props?.strength || generateRandomNumber(0, 10);
    this.speed = props?.speed || generateRandomNumber(0, 10);
  }

  getStats() {
    return {
      level: this.level,
      strength: this.strength,
      speed: this.speed,
    };
  }

  announce() {
    return `
RAWR a monster!!!

${JSON.stringify(this.getStats(), null, 2)}

`;
  }
}
