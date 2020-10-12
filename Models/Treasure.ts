import { Surprise } from "./Surprise.ts";
import { coinFlip, generateRandomNumber } from "../util/Random.ts";

export type Item = {
  weight: number;
  health?: number;
  strength?: number;
  speed?: number;
};

/**
 * Treasure is dropped by Monsters or found randomly in rooms
 */
export class Treasure implements Surprise {
  stats: Item;

  constructor() {
    this.stats = this.generateItem();
  }

  getStats() {
    return this.stats;
  }

  generateItem() {
    let weight = 1;
    const itemStats = ["health", "strength", "speed"].reduce((acc, item) => {
      const impact = generateRandomNumber(0, 8) - 2;
      if (impact > 1 && 3 >= impact) weight += 1;
      if (impact > 3) weight += 1;
      return {
        ...acc,
        [item]: impact,
      };
    }, {});

    return {
      ...itemStats,
      weight,
    };
  }

  announce() {
    return `
Hmm do you want to pick this up?

${
      !this.stats.health && !this.stats.strength && !this.stats.speed
        ? "...I think it's a rock..."
        : "(Impact to your gear is shown)"
    }

${JSON.stringify(this.getStats(), null, 2)}

`;
  }
}
