import { Surprise } from "https://raw.githubusercontent.com/evenstephenr/deno-munchkin/core/Models/Surprise.ts";
import { generateRandomNumber } from "https://raw.githubusercontent.com/evenstephenr/deno-munchkin/core/util/Random.ts";

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

  constructor() {
    this.level = generateRandomNumber(1, 20);
    this.strength = generateRandomNumber(0, 20);
    this.speed = generateRandomNumber(0, 10);
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
