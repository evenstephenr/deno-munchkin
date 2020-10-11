import { Monster } from "./Monster.ts";
import { Treasure } from "./Treasure.ts";
import { coinFlip } from "../util/Random.ts";

export class Door {
  monster: Monster | null;
  reward: Treasure | null;

  constructor() {
    this.monster = coinFlip() ? new Monster() : null;
    this.reward = this.monster ? null : new Treasure();
  }

  generateLoot() {
    if (!this.loot()) this.reward = new Treasure();
  }

  loot() {
    return this.reward && this.reward.getStats();
  }

  getMonster() {
    return this.monster && this.monster.getStats();
  }

  refresh() {
    this.monster = coinFlip() ? new Monster() : null;
    this.reward = this.monster ? null : new Treasure();
  }

  knock() {
    if (this.monster) return this.monster.announce();
    if (this.reward) return this.reward.announce();
  }
}
