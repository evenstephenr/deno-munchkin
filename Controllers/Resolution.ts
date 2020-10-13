import { Player } from "../Models/Player.ts";
import { Monster } from "../Models/Monster.ts";
import { Item } from "../Models/Treasure.ts";

export const Resolution = {
  attack: (player: Player, monster: Monster) => {
    const {
      level: playerLevel,
      strength: playerStrength,
    } = player.rawStats();
    const {
      level: monsterLevel,
      strength: monsterStrength,
    } = monster.getStats();

    if (
      playerLevel + playerStrength >= monsterLevel + monsterStrength
    ) {
      return true;
    }
    return false;
  },
  run: (player: Player, monster: Monster) => {
    const {
      level: playerLevel,
      speed: playerSpeed,
    } = player.rawStats();
    const {
      level: monsterLevel,
      speed: monsterSpeed,
    } = monster.getStats();

    if (playerLevel + playerSpeed > monsterLevel + monsterSpeed) return true;
    return false;
  },
  pickupItem: (player: Player, stats: Item) => {
    const { maxWeight, items } = player.rawStats();
    const spaceLeft = maxWeight -
      items.reduce((count, item) => count += item.weight, 0);
    if (spaceLeft >= stats.weight) {
      player.addItem(stats);
      if (stats.health) player.adjustHealth(stats.health);
      if (stats.speed) player.adjustSpeed(stats.speed);
      if (stats.strength) player.adjustStrength(stats.strength);
      return true;
    }

    return false;
  },
  dropItem: (player: Player, itemIndex: number) => {
    player.dropItem(itemIndex);
    return true;
  },
};
