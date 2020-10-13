import { Item } from "./Treasure.ts";

type PlayerOptions = {
  name?: string;
  items?: Item[];
  level?: number;
  health?: number;
  strength?: number;
  speed?: number;
  maxWeight?: number;
};

export class Player {
  stats: {
    level: number;
    health: number;
    strength: number;
    speed: number;
  };
  name: string;
  items: Item[];
  maxWeight: number;
  /**
   * TODO: this should basically give a player another reroll (with a random stat)
   *  if they lose a battle with a monster or cannot run away
   * */
  // luck: number;

  constructor(props?: PlayerOptions) {
    this.stats = {
      level: props?.level || 1,
      health: props?.health || 10,
      strength: props?.strength || 1,
      speed: props?.speed || 1,
    };

    this.name = props?.name || "Player";
    this.items = props?.items || [];
    this.maxWeight = props?.maxWeight || 12;
  }

  addItem(item: Item) {
    this.items.push(item);
  }

  dropItem(index: number) {
    this.items.splice(index, 1);
  }

  adjustHealth(n: number) {
    this.stats.health += n;
  }

  adjustStrength(n: number) {
    this.stats.strength += n;
  }

  adjustSpeed(n: number) {
    this.stats.speed += n;
  }

  levelUp() {
    this.stats.level++;
  }

  loseHealth() {
    this.stats.health--;
  }

  rawStats() {
    return { ...this.stats, items: this.items, maxWeight: this.maxWeight };
  }

  getName() {
    return this.name;
  }

  getStats() {
    return JSON.stringify(
      {
        name: this.name,
        stats: this.stats,
        items: this.items,
        maxWeight: this.maxWeight,
      },
      null,
      2,
    );
  }
}
