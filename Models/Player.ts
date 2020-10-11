import { Item } from "https://raw.githubusercontent.com/evenstephenr/deno-munchkin/core/Models/Treasure.ts";

type PlayerOptions = {
  name?: string;
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
  /**
   * TODO: this should basically give a player another reroll (with a random stat)
   *  if they lose a battle with a monster or cannot run away
   * */
  // luck: number;

  constructor(props: PlayerOptions = {}) {
    const { name = "Player" } = props;
    this.stats = {
      level: 1,
      health: 10,
      strength: 1,
      speed: 1,
    };
    this.name = name;
    this.items = [];
  }

  addItem(item: Item) {
    this.items.push(item);
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

  getName() {
    return this.name;
  }

  getStats() {
    return JSON.stringify(
      {
        name: this.name,
        stats: this.stats,
        items: this.items,
      },
      null,
      2
    );
  }
}
