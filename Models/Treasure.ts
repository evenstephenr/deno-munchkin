import { Surprise } from "./Surprise.ts";
import { generateRandomNumber, coinFlip } from "../util/Random.ts";

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
      const skip = coinFlip();
      if (skip) {
        return acc;
      }

      const isGood = coinFlip();
      if (isGood) {
        const impact = generateRandomNumber(1, 3);
        if (impact >= 3) weight++;
        return {
          ...acc,
          [item]: impact,
        };
      }

      return {
        ...acc,
        [item]: generateRandomNumber(1, 2) * -1,
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
